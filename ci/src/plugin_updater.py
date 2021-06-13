import base64
import re
import sys
from json import loads as json_loads
from typing import Dict, List

from github import Github, GithubException
from pytablewriter import MarkdownTableWriter
from tqdm import tqdm

from _utils import (
    END_COMMENT,
    START_COMMENT,
    ghtoken,
    plugin_author,
    plugin_description,
    plugin_json,
    plugin_markdown,
    plugin_md_reg,
    plugin_name,
    plugin_version,
    plugin_website,
    repository,
)


def plugin_reader() -> str:
    with open(plugin_markdown, "r", encoding="utf-8") as f:
        return f.read()


def plugin_writer(content: str):
    with open(plugin_markdown, "w", encoding="utf-8") as f:
        f.write(content)


def decode_content(data: str) -> str:
    decoded_bytes = base64.b64decode(data)
    return str(decoded_bytes, "utf-8")


def gen_link(name: str, website: str) -> str:
    return f"[{name}]({website})"


def gen_plugin_list(mainifests: List[Dict[str, str]]) -> List[List[str]]:
    return [
        [
            gen_link(m[plugin_name], m[plugin_website]),
            m[plugin_description],
            m[plugin_author],
            m[plugin_version],
        ]
        for m in tqdm(mainifests)
    ]


def gen_md_new_from_old(mdlist_new: str, mdlist_old: str) -> str:
    mdlist_new = f"{START_COMMENT}\n{mdlist_new}\n{END_COMMENT}"
    return re.sub(plugin_md_reg, mdlist_new, mdlist_old)


if __name__ == "__main__":
    g = Github(ghtoken)
    try:
        repo = g.get_repo(repository)
    except GithubException:
        print(
            "Authentication Error."
            "Try saving a GitHub Token in your Repo Secrets or "
            "Use the GitHub Actions Token,"
            "which is automatically used by the action."
        )
        sys.exit(1)

    mainifests = repo.get_contents(plugin_json)
    mainifests = decode_content(mainifests.content)
    mainifests = json_loads(mainifests)

    infolist = gen_plugin_list(mainifests)
    mdtable_writer = MarkdownTableWriter(
        headers=[
            plugin_name,
            plugin_description,
            plugin_author,
            plugin_version,
        ],
        value_matrix=infolist,
    )
    mdlist_new = mdtable_writer.dumps()

    mdlist_old = plugin_reader()
    mdlist_new = gen_md_new_from_old(mdlist_new, mdlist_old)
    plugin_writer(mdlist_new)
