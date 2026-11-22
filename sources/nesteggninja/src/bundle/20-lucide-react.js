var ane = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const sne = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .trim(),
  tn = (e, t) => {
    const n = React.forwardRef(
      (
        {
          color: r = "currentColor",
          size: i = 24,
          strokeWidth: o = 2,
          absoluteStrokeWidth: a,
          className: s = "",
          children: u,
          ...c
        },
        d,
      ) =>
        React.createElement(
          "svg",
          {
            ref: d,
            ...ane,
            width: i,
            height: i,
            stroke: r,
            strokeWidth: a ? (Number(o) * 24) / Number(i) : o,
            className: ["lucide", `lucide-${sne(e)}`, s].join(" "),
            ...c,
          },
          [...t.map(([h, p]) => React.createElement(h, p)), ...(Array.isArray(u) ? u : [u])],
        ),
    );
    return (n.displayName = `${e}`), n;
  };
const lne = tn("Activity", [
  [
    "path",
    {
      d: "M22 12h-4l-3 9L9 3l-3 9H2",
      key: "d5dnw9",
    },
  ],
]);
const une = tn("ArrowRight", [
  [
    "path",
    {
      d: "M5 12h14",
      key: "1ays0h",
    },
  ],
  [
    "path",
    {
      d: "m12 5 7 7-7 7",
      key: "xquz4c",
    },
  ],
]);
const cne = tn("BookOpen", [
  [
    "path",
    {
      d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",
      key: "vv98re",
    },
  ],
  [
    "path",
    {
      d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
      key: "1cyq3y",
    },
  ],
]);
const fne = tn("Calculator", [
  [
    "rect",
    {
      width: "16",
      height: "20",
      x: "4",
      y: "2",
      rx: "2",
      key: "1nb95v",
    },
  ],
  [
    "line",
    {
      x1: "8",
      x2: "16",
      y1: "6",
      y2: "6",
      key: "x4nwl0",
    },
  ],
  [
    "line",
    {
      x1: "16",
      x2: "16",
      y1: "14",
      y2: "18",
      key: "wjye3r",
    },
  ],
  [
    "path",
    {
      d: "M16 10h.01",
      key: "1m94wz",
    },
  ],
  [
    "path",
    {
      d: "M12 10h.01",
      key: "1nrarc",
    },
  ],
  [
    "path",
    {
      d: "M8 10h.01",
      key: "19clt8",
    },
  ],
  [
    "path",
    {
      d: "M12 14h.01",
      key: "1etili",
    },
  ],
  [
    "path",
    {
      d: "M8 14h.01",
      key: "6423bh",
    },
  ],
  [
    "path",
    {
      d: "M12 18h.01",
      key: "mhygvu",
    },
  ],
  [
    "path",
    {
      d: "M8 18h.01",
      key: "lrp35t",
    },
  ],
]);
const E4 = tn("Check", [
  [
    "path",
    {
      d: "M20 6 9 17l-5-5",
      key: "1gmf2c",
    },
  ],
]);
const r2 = tn("Clock", [
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay",
    },
  ],
  [
    "polyline",
    {
      points: "12 6 12 12 16 14",
      key: "68esgv",
    },
  ],
]);
const T4 = tn("Download", [
  [
    "path",
    {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
      key: "ih7n3h",
    },
  ],
  [
    "polyline",
    {
      points: "7 10 12 15 17 10",
      key: "2ggqvy",
    },
  ],
  [
    "line",
    {
      x1: "12",
      x2: "12",
      y1: "15",
      y2: "3",
      key: "1vk2je",
    },
  ],
]);
const dne = tn("HelpCircle", [
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay",
    },
  ],
  [
    "path",
    {
      d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
      key: "1u773s",
    },
  ],
  [
    "path",
    {
      d: "M12 17h.01",
      key: "p32p05",
    },
  ],
]);
const hne = tn("Info", [
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay",
    },
  ],
  [
    "path",
    {
      d: "M12 16v-4",
      key: "1dtifu",
    },
  ],
  [
    "path",
    {
      d: "M12 8h.01",
      key: "e9boi3",
    },
  ],
]);
const pne = tn("RefreshCw", [
  [
    "path",
    {
      d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
      key: "v9h5vc",
    },
  ],
  [
    "path",
    {
      d: "M21 3v5h-5",
      key: "1q7to0",
    },
  ],
  [
    "path",
    {
      d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
      key: "3uifl3",
    },
  ],
  [
    "path",
    {
      d: "M8 16H3v5",
      key: "1cv678",
    },
  ],
]);
const mne = tn("Settings2", [
  [
    "path",
    {
      d: "M20 7h-9",
      key: "3s1dr2",
    },
  ],
  [
    "path",
    {
      d: "M14 17H5",
      key: "gfn3mx",
    },
  ],
  [
    "circle",
    {
      cx: "17",
      cy: "17",
      r: "3",
      key: "18b49y",
    },
  ],
  [
    "circle",
    {
      cx: "7",
      cy: "7",
      r: "3",
      key: "dfmy0x",
    },
  ],
]);
const vne = tn("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
  [
    "path",
    {
      d: "m9 12 2 2 4-4",
      key: "dzmm74",
    },
  ],
]);
const yne = tn("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
]);
const gne = tn("Sigma", [
  [
    "path",
    {
      d: "M18 7V4H6l6 8-6 8h12v-3",
      key: "zis8ev",
    },
  ],
]);
const bne = tn("Table", [
  [
    "path",
    {
      d: "M12 3v18",
      key: "108xh3",
    },
  ],
  [
    "rect",
    {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      rx: "2",
      key: "afitv7",
    },
  ],
  [
    "path",
    {
      d: "M3 9h18",
      key: "1pudct",
    },
  ],
  [
    "path",
    {
      d: "M3 15h18",
      key: "5xshup",
    },
  ],
]);
const wne = tn("Terminal", [
  [
    "polyline",
    {
      points: "4 17 10 11 4 5",
      key: "akl6gq",
    },
  ],
  [
    "line",
    {
      x1: "12",
      x2: "20",
      y1: "19",
      y2: "19",
      key: "q2wloq",
    },
  ],
]);
const C4 = tn("TrendingUp", [
  [
    "polyline",
    {
      points: "22 7 13.5 15.5 8.5 10.5 2 17",
      key: "126l90",
    },
  ],
  [
    "polyline",
    {
      points: "16 7 22 7 22 13",
      key: "kwv8wd",
    },
  ],
]);
const k4 = tn("Upload", [
  [
    "path",
    {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
      key: "ih7n3h",
    },
  ],
  [
    "polyline",
    {
      points: "17 8 12 3 7 8",
      key: "t8dd8p",
    },
  ],
  [
    "line",
    {
      x1: "12",
      x2: "12",
      y1: "3",
      y2: "15",
      key: "widbto",
    },
  ],
]);
const i2 = tn("Wallet", [
  [
    "path",
    {
      d: "M21 12V7H5a2 2 0 0 1 0-4h14v4",
      key: "195gfw",
    },
  ],
  [
    "path",
    {
      d: "M3 5v14a2 2 0 0 0 2 2h16v-5",
      key: "195n9w",
    },
  ],
  [
    "path",
    {
      d: "M18 12a2 2 0 0 0 0 4h4v-4Z",
      key: "vllfpd",
    },
  ],
]);
