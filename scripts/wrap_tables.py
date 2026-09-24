p="webapp/app.py"
s=open(p,encoding="utf-8").read()
old='markdown_html = md_lib.markdown(markdown_text, extensions=["tables"])'
new=('markdown_html = md_lib.markdown(markdown_text, extensions=["tables"])\n'
     '    markdown_html = markdown_html.replace("<table>", "<div class=\\"tbl-wrap\\"><table>").replace("</table>", "</table></div>")')
assert old in s
s=s.replace(old,new)
open(p,"w",encoding="utf-8").write(s)
print("wrapped")
