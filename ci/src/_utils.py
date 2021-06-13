import os

ghtoken = os.getenv("GH_TOKEN")
repository = os.getenv("REPOSITORY")

plugin_markdown = os.getenv("PLUGIN_MARKDOWN")
plugin_json = os.getenv("PLUGIN_JSON")

plugin_name = os.getenv("PLUGIN_NAME")
plugin_author = os.getenv("PLUGIN_AUTHOR")
plugin_description = os.getenv("PLUGIN_DESCRIPTION")
plugin_version = os.getenv("PLUGIN_VERSION")
plugin_website = os.getenv("PLUGIN_WEBSITE")

START_COMMENT = "<!--START_SECTION:plugin-->"
END_COMMENT = "<!--END_SECTION:plugin-->"
plugin_md_reg = f"{START_COMMENT}[\\s\\S]+{END_COMMENT}"
