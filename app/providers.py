"""Composition root for replaceable SAM providers.

Application modules import these factories and the protocols in ``ports``;
only this module knows which local/remote adapter is selected by profile.
"""
from __future__ import annotations

import os
from pathlib import Path

from .ports import LocalMemoryProvider, MemoryProvider, ModelProvider, OpenVikingMemoryProvider, RuntimeProvider
from .model_provider import OpenAICompatibleProvider
from .runtime_config import RuntimeConfig
from .harness.runtime.openclaw_adapter import OpenClawAdapter
from .harness.staging import StagingStore


def runtime_provider(config: RuntimeConfig, staging: StagingStore) -> RuntimeProvider:
    return OpenClawAdapter(staging, config=config)


def memory_provider(config: RuntimeConfig, *, env: dict[str, str] | None = None) -> MemoryProvider:
    values = env if env is not None else os.environ
    if config.memory_provider == "local":
        return LocalMemoryProvider(config.memory_root)
    return OpenVikingMemoryProvider(
        base_url=values.get(config.memory_base_url_env),
        api_key=values.get(config.memory_api_key_env),
    )


def model_provider(config: RuntimeConfig, *, env: dict[str, str] | None = None) -> ModelProvider:
    return OpenAICompatibleProvider(env=env, config=config)
