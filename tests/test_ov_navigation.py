from pathlib import Path
from app.db import init_db
from app.entities import EntityBridgeService, EntityRosterService
from app.harness.staging import StagingStore
from app.ov_navigation import OVNavigationService, verify_narrative_item
from app.storage import SourceFileStore

class FakeWorker:
    def __init__(self, items): self.items=items
    def run(self, **_): return self.items

def setup(tmp_path: Path):
    db=tmp_path/'app.db';init_db(db); stored=SourceFileStore(tmp_path/'objects',db).put_bytes(b'x',original_name='bp.pdf')
    a='未蓝科技有限公司采用低温烧结技术，产品用于新能源汽车电池。公司计划2025年营收做到1000万元。公司自称技术行业领先。'
    b='未蓝科技有限公司全资子公司常州未蓝新能源有限公司负责电池材料供应。'
    StagingStore(db).save_manifest({'file_hash':stored.file_hash,'filename':'bp.pdf','format':'pdf','parse_summary':{'status':'parsed'},'pages':[{'page_no':1,'text_items':[{'text':a,'source_loc':{'locator':'text/0'}},{'text':b,'source_loc':{'locator':'text/1'}}],'tables':[]}]})
    EntityRosterService(db).declare(company_id='acme',entity_name='未蓝科技有限公司')
    return db,stored,EntityBridgeService(db).run(company_id='acme',file_hash=stored.file_hash)

def items(): return [
 {'entity':'未蓝科技有限公司','category':'技术原理','kind':'fact','content':'公司采用低温烧结技术。','quote':'采用低温烧结技术'},
 {'entity':'未蓝科技有限公司','category':'产品与用途','kind':'fact','content':'产品用于新能源汽车电池。','quote':'产品用于新能源汽车电池'},
 {'entity':'未蓝科技有限公司','category':'客户与市场','kind':'plan','source_speaker':'公司','content':'公司计划2025年营收做到1000万元。','quote':'公司计划2025年营收做到1000万元'},
 {'entity':'未蓝科技有限公司','category':'其他','kind':'opinion','source_speaker':'公司自称','content':'公司自称技术行业领先。','quote':'公司自称技术行业领先'},
 {'entity':'常州未蓝新能源有限公司','category':'供应链与运营','kind':'fact','content':'子公司负责电池材料供应。','quote':'常州未蓝新能源有限公司负责电池材料供应'}]

def test_folder_documents_are_entity_scoped_idempotent(tmp_path):
 db,stored,run=setup(tmp_path); svc=OVNavigationService(db); worker=FakeWorker(items())
 first=svc.rebuild(company_id='acme',file_hash=stored.file_hash,bridge_run_id=run['id'],worker=worker); svc.rebuild(company_id='acme',file_hash=stored.file_hash,bridge_run_id=run['id'],worker=worker)
 rows=svc.list(company_id='acme'); assert len(rows)==4 and first['item_count']==5
 tech=[r for r in rows if r['folder']=='技术与产品'][0]; assert '低温烧结' in tech['l1_overview'] and tech['citations'][0]['quote']
 assert svc.list(company_id='acme',entity='常州未蓝新能源有限公司')[0]['entity']=='常州未蓝新能源有限公司'
 assert '（计划）' in svc.list(company_id='acme',folder='客户与市场')[0]['l1_overview']
 assert '（观点·公司自称）' in svc.list(company_id='acme',folder='其他')[0]['l1_overview']

def test_bad_quote_entity_or_unmarked_plan_is_rejected(tmp_path):
 db,stored,run=setup(tmp_path); blocks=OVNavigationService(db)._blocks('acme',stored.file_hash,run['id'])
 bad=[{'entity':'未蓝科技有限公司','category':'技术原理','kind':'fact','content':'x','quote':'不存在'}, {'entity':'其他','category':'技术原理','kind':'fact','content':'x','quote':'采用低温烧结技术'}, {'entity':'未蓝科技有限公司','category':'其他','kind':'fact','content':'计划2025年营收','quote':'公司计划2025年营收做到1000万元'}]
 assert [verify_narrative_item(x,blocks) for x in bad]==[None,None,None]
