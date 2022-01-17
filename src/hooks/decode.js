import xss from "xss";

export default function useDecode() {
  function htmlDecode(input) {
    const e = document.createElement("div");
    e.innerHTML = input;
    var html = xss(e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue, {
      stripIgnoreTag: false, // filter out all HTML not in the whitelist
      stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
      // to filter out its content
    });
    return html;
  }

  return { htmlDecode };
}
