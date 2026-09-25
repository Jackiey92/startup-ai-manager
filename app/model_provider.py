"""OpenAI-compatible model provider used by server-side guidance."""
from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from typing import Any

from .ports import ModelProvider
from .runtime_config import RuntimeConfig


class ModelUnavailable(RuntimeError):
    """Raised when a configured model cannot produce a valid response."""


class OpenAICompatibleProvider(ModelProvider):
    def __init__(self, *, env: dict[str, str] | None = None, config: RuntimeConfig | None = None):
        self.env = env if env is not None else os.environ
        self.config = config or RuntimeConfig.from_env(env=self.env)

    def complete_json(self, *, system_prompt: str, payload: dict[str, Any]) -> dict[str, Any]:
        base_url = self.env.get(self.config.model_base_url_env, self.config.model_base_url).rstrip("/")
        model = self.env.get(self.config.model_name_env, self.config.model_default)
        api_key = self.env.get(self.config.model_api_key_env)
        if not api_key:
            raise ModelUnavailable(f"AI model is not configured: set {self.config.model_api_key_env}")
        body = {
            "model": model,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": json.dumps(payload, ensure_ascii=False)},
            ],
        }
        if model != "auto":
            body["temperature"] = 0.2
        request = urllib.request.Request(
            f"{base_url}/chat/completions",
            data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                data = json.loads(response.read().decode("utf-8"))
            return json.loads(data["choices"][0]["message"]["content"])
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, KeyError, IndexError, TypeError, json.JSONDecodeError) as exc:
            raise ModelUnavailable("AI model request failed or returned invalid JSON") from exc
