import { replaceHomoglyphs } from "./homoglyphs";
import { ZodEffects, ZodString } from "zod";

export function containsProfanity(
  text: string,
  mode: "word" | "substring"
): boolean {
  const normalizedText = text
    .toLowerCase()
    .split(/[.,"/#!?$%^&*;:{}=\-_`~()\s\n]+/g)
    .map((str) => {
      return replaceHomoglyphs(sanitizeString(str) ?? "");
    });

  const hasProfanity = profanities.some((profanity) => {
    return normalizedText.some((word) => {
      return mode === "word"
        ? word.startsWith(profanity)
        : word.includes(profanity);
    });
  });

  return hasProfanity;
}

function sanitizeString(str: string | undefined): string | undefined {
  if (str === undefined || str === "") {
    return str;
  }

  return str
    .replace(/[\u0300-\u036F]/g, "")
    .trim()
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{3,}/g, "  ");
}

export function doesNotContainProfanity(
  mode: "word" | "substring",
  schema: ZodString
): ZodEffects<ZodString> {
  return schema.refine(
    (val) => {
      return !containsProfanity(val, mode);
    },
    (val) => ({
      message: `Profanity detected. Please remove it. If you believe this is a mistake, please contact us. (${val})`,
    })
  );
}

// Sorry for the bad words
const profanities = [
  "miodec",
  "bitly",
  "niqqa",
  "niqqer",
  "ni99a",
  "ni99er",
  "niggas",
  "niga",
  "niger",
  "retard",
  "ahole",
  "anus",
  "ash0le",
  "asholes",
  "assh0le",
  "assh0lez",
  "asshole",
  "assholes",
  "assholz",
  "asswipe",
  "azzhole",
  "bassterds",
  "bastard",
  "bastards",
  "bastardz",
  "basterds",
  "basterdz",
  "biatch",
  "bitch",
  "bitches",
  "blow job",
  "boffing",
  "butthole",
  "buttwipe",
  "c0ck",
  "c0cks",
  "c0k",
  "carpet muncher",
  "cawk",
  "cawks",
  "clit",
  "cnts",
  "cntz",
  "cock",
  "cockhead",
  "cock-head",
  "cocks",
  "cocksucker",
  "cock-sucker",
  "crap",
  "cum",
  "cunt",
  "cunts",
  "cuntz",
  "dick",
  "dild0",
  "dild0s",
  "dildo",
  "dildos",
  "dilld0",
  "dilld0s",
  "dominatricks",
  "dominatrics",
  "dominatrix",
  "dyke",
  "enema",
  "f u c k",
  "f u c k e r",
  "fag",
  "fag1t",
  "faget",
  "fagg1t",
  "faggit",
  "faggot",
  "fagit",
  "fags",
  "fagz",
  "faigs",
  "flipping the bird",
  "fudge packer",
  "fukah",
  "fuken",
  "fuker",
  "fukin",
  "fukk",
  "fukkah",
  "fukken",
  "fukker",
  "fukkin",
  "g00k",
  "gayboy",
  "gaygirl",
  "gayz",
  "god-damned",
  "h00r",
  "h0ar",
  "h0re",
  "jackoff",
  "japs",
  "jerk-off",
  "jisim",
  "jiss",
  "jizm",
  "jizz",
  "knob",
  "knobs",
  "knobz",
  "kunt",
  "kunts",
  "kuntz",
  "lezzian",
  "lipshits",
  "lipshitz",
  "masochist",
  "masokist",
  "massterbait",
  "masstrbait",
  "masstrbate",
  "masterbaiter",
  "masterbate",
  "masterbates",
  "n1gr",
  "nastt",
  "nigger;",
  "nigur;",
  "niiger;",
  "niigr;",
  "orafis",
  "orgasim;",
  "orgasm",
  "orgasum",
  "oriface",
  "orifice",
  "orifiss",
  "peeenus",
  "peeenusss",
  "peenus",
  "peinus",
  "pen1s",
  "penas",
  "penis",
  "penis-breath",
  "penus",
  "penuus",
  "phuc",
  "phuck",
  "phuk",
  "phuker",
  "phukker",
  "poonani",
  "pr1c",
  "pr1ck",
  "pr1k",
  "puss",
  "pussee",
  "pussy",
  "puuke",
  "puuker",
  "qweers",
  "qweerz",
  "qweir",
  "recktum",
  "rectum",
  "retard",
  "sadist",
  "scank",
  "schlong",
  "semen",
  "sex",
  "sexy",
  "sh!t",
  "sh1t",
  "sh1ter",
  "sh1ts",
  "sh1tter",
  "sh1tz",
  "shit",
  "shits",
  "shitter",
  "shitty",
  "shity",
  "shitz",
  "shyt",
  "shyte",
  "shytty",
  "shyty",
  "skanck",
  "skank",
  "skankee",
  "skankey",
  "skanks",
  "skanky",
  "slut",
  "sluts",
  "slutty",
  "slutz",
  "son-of-a-bitch",
  "turd",
  "va1jina",
  "vag1na",
  "vagiina",
  "vagina",
  "vaj1na",
  "vajina",
  "vullva",
  "vulva",
  "wh00r",
  "wh0re",
  "whore",
  "xrated",
  "b!+ch",
  "bitch",
  "blowjob",
  "clit",
  "arschloch",
  "shit",
  "asshole",
  "b!tch",
  "b17ch",
  "b1tch",
  "bastard",
  "bi+ch",
  "boiolas",
  "buceta",
  "c0ck",
  "cawk",
  "chink",
  "cipa",
  "clits",
  "cum",
  "cunt",
  "dildo",
  "dirsa",
  "ejakulate",
  "fatass",
  "fcuk",
  "fux0r",
  "hoer",
  "hore",
  "jism",
  "kawk",
  "l3itch",
  "l3i+ch",
  "masturbate",
  "masterbat",
  "masterbat3",
  "motherfucker",
  "s.o.b.",
  "mofo",
  "nazi",
  "nigga",
  "nigger",
  "nutsack",
  "phuck",
  "pimpis",
  "pusse",
  "pussy",
  "scrotum",
  "sh!t",
  "shemale",
  "shi+",
  "sh!+",
  "slut",
  "smut",
  "teets",
  "tits",
  "boobs",
  "b00bs",
  "teez",
  "testical",
  "testicle",
  "titt",
  "w00se",
  "jackoff",
  "wank",
  "whoar",
  "whore",
  "dyke",
  "fuck",
  "shit",
  "amcik",
  "andskota",
  "arse",
  "assrammer",
  "ayir",
  "bi7ch",
  "bitch",
  "bollock",
  "breasts",
  "butt-pirate",
  "cabron",
  "cazzo",
  "chraa",
  "chuj",
  "cunt",
  "daygo",
  "dego",
  "dick",
  "dike",
  "dupa",
  "dziwka",
  "ejackulate",
  "ekrem",
  "enculer",
  "fag",
  "fanculo",
  "fanny",
  "feces",
  "felcher",
  "ficken",
  "flikker",
  "foreskin",
  "fotze",
  "futkretzn",
  "gook",
  "guiena",
  "h4x0r",
  "helvete",
  "hoer",
  "honkey",
  "huevon",
  "injun",
  "jizz",
  "kanker",
  "klootzak",
  "kraut",
  "knulle",
  "kuksuger",
  "kurac",
  "kurwa",
  "kyrpa",
  "lesbo",
  "mamhoon",
  "masturbat",
  "merd",
  "mibun",
  "monkleigh",
  "mouliewop",
  "muie",
  "mulkku",
  "muschi",
  "nazis",
  "nepesaurio",
  "nigger",
  "orospu",
  "paska",
  "perse",
  "picka",
  "pierdol",
  "pillu",
  "pimmel",
  "piss",
  "pizda",
  "poontsee",
  "porn",
  "p0rn",
  "pr0n",
  "preteen",
  "pula",
  "pule",
  "puta",
  "puto",
  "qahbeh",
  "queef",
  "rautenberg",
  "schaffer",
  "scheiss",
  "schlampe",
  "schmuck",
  "sh!t",
  "sharmuta",
  "sharmute",
  "skurwysyn",
  "sphencter",
  "spierdalaj",
  "splooge",
  "suka",
  "b00b",
  "testicle",
  "titt",
  "twat",
  "vittu",
  "wank",
  "wetback",
  "wichser",
  "zabourah",
];
