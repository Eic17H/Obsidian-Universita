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
    const match = file.path.match(/(?:^|\/)Semestre [12]\/([a-zA-Z]+)\//);
    if (!match) {
      return null;
    }
    return match[1].toLowerCase();
  }
  async wrapCrossSubjectLinks() {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      return;
    }
    const currentSubject = this.getSubject(file);
    if (!currentSubject) {
      return;
    }
    await this.app.vault.process(file, (content) => {
      return content.replace(
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
    });
  }
  // FIRST FEATURE:
  async onload() {
    this.addCommand({
      id: "add-semester-css-class",
      name: "Add semester CSS class",
      callback: () => this.addSemesterCssClass()
    });
    this.addCommand({
      id: "wrap-cross-subject-links",
      name: "Wrap cross-subject links",
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
