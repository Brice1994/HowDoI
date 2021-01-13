import fetch from "node-fetch";
import cheerio from "cheerio";
import { promises as fsPromises } from "fs";
(async () => {
  const host = "http://www.rosettacode.org";
  const wikiCategory = await fetch(`${host}/wiki/Category:Scheme`);
  const text = await wikiCategory.text();
  const $ = cheerio.load(text);
  const links = $("a[href*='/wiki/']");
  const arr: string[] = [];
  links.each((_, elem) => arr.push(`${host}${elem.attribs.href}`));
  await fsPromises.writeFile("./links.json", JSON.stringify(arr));
  let d;
})();
