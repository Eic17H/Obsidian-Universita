var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SemesterCssPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var SemesterCssPlugin = class extends import_obsidian.Plugin {
  // NEW FEATURE EXPERIMENTAL:
  getSubject(file) {
    const match = file.path.match(/(?:^|\/)Semestre [12]\/([a-zA-Z0-9]+)\//);
    if (!match) {
      return null;
    }
    return match[1].toLowerCase();
  }
  async wrapCrossSubjectLinks() {
    const file = this.app.workspace.getActiveFile();
    let currentSubject;
    if (!file) {
      currentSubject = "";
      return;
    } else {
      currentSubject = this.getSubject(file);
      if (!currentSubject) {
        currentSubject = "";
      }
    }
    await this.app.vault.process(file, (content) => {
      const existingSpans = [];
      content = content.replace(
        /<span class="[^"]*">[\s\S]*?<\/span>/g,
        (span) => {
          const index = existingSpans.push(span) - 1;
          return `\0SPAN_${index}\0`;
        }
      );
      content = content.replace(
        /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,
        (match, linkpath, alias) => {
          const linkedFile = this.app.metadataCache.getFirstLinkpathDest(
            linkpath,
            file.path
          );
          if (!linkedFile) {
            return match;
          }
          const linkedSubject = this.getSubject(linkedFile);
          if (!linkedSubject || linkedSubject === currentSubject) {
            return match;
          }
          return `<span class="${linkedSubject}">${match}</span>`;
        }
      );
      content = content.replace(
        /\0SPAN_(\d+)\0/g,
        (_, index) => existingSpans[Number(index)]
      );
      return content;
    });
  }
  // FIRST FEATURE:
  async onload() {
    this.addCommand({
      id: "add-semester-css-class",
      name: "Fix document subject class",
      callback: () => this.addSemesterCssClass()
    });
    this.addCommand({
      id: "wrap-cross-subject-links",
      name: "Fix link subject class",
      callback: () => this.wrapCrossSubjectLinks()
    });
  }
  async addSemesterCssClass() {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      return;
    }
    const match = file.path.match(/(?:^|\/)Semestre [12]\/([a-zA-Z]+)\//);
    if (!match) {
      return;
    }
    const cssClass = match[1].toLowerCase();
    await this.app.fileManager.processFrontMatter(
      file,
      (frontmatter) => {
        if (!Array.isArray(frontmatter.cssclasses)) {
          frontmatter.cssclasses = [];
        }
        if (!frontmatter.cssclasses.includes(cssClass)) {
          frontmatter.cssclasses.push(cssClass);
        }
      }
    );
  }
};
