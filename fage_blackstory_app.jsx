import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Skull, BookOpen, ChevronLeft, Filter, Eye, EyeOff, X, Moon, Sparkles } from "lucide-react";

const STORIES = [
  {
    semester: "1. Semester",
    title: "Das Gewicht der Stille",
    diagnosis: "Adipositas",
    sentence: "Die Waage schwieg nicht mehr, doch das eigentliche Gewicht lag längst woanders.",
    story:
      "Herr Keller nahm über Jahre stark zu. Zuerst störte ihn nur, dass Kleider enger wurden und Treppen anstrengender waren. Dann kamen Bluthochdruck, Gelenkschmerzen und Atemnot dazu. Erst als er kaum noch aus dem Sessel hochkam, wurde klar: Sein Gewicht war nicht mehr nur ein Schönheitsproblem."
  },
  {
    semester: "1. Semester",
    title: "Die Verschwindende",
    diagnosis: "Mangelernährung / Malnutrition",
    sentence: "Der Teller wurde nie leer und trotzdem verschwand sie Stück für Stück.",
    story:
      "Frau Baumann lebte alleine und sagte stets: «Ich habe keinen grossen Hunger.» Sie ass Tee, Zwieback und manchmal Suppe. Nach und nach verlor sie Gewicht, Kraft und Muskeln. Als sie beim Aufstehen stürzte, zeigte sich: Ihr Körper hatte zu wenig Energie und Eiweiss bekommen."
  },
  {
    semester: "1. Semester",
    title: "Der falsche Weg",
    diagnosis: "Dysphagie",
    sentence: "Der Bissen nahm den falschen Weg und plötzlich wurde Essen zur Gefahr.",
    story:
      "Nach einem Schlaganfall konnte Herr Rüegg nicht mehr sicher schlucken. Er hustete beim Trinken, räusperte sich oft und wirkte nach dem Essen erschöpft. Einmal verschluckte er sich stark und bekam Atemnot. Das Problem war nicht der Appetit, sondern dass Nahrung und Flüssigkeit in die falsche Richtung geraten konnten."
  },
  {
    semester: "1. Semester",
    title: "Der dunkle Punkt",
    diagnosis: "Melanom",
    sentence: "Ein kleiner dunkler Fleck begann, seine eigene Geschichte zu schreiben.",
    story:
      "Frau Steiner bemerkte seit Monaten ein dunkles Muttermal am Rücken. Es wurde grösser, unregelmässig und juckte manchmal. Weil es nicht schmerzte, wartete sie lange. Beim Hautarzt zeigte sich: Es handelte sich um ein bösartiges Melanom."
  },
  {
    semester: "2. Semester",
    title: "Das alte Knirschen",
    diagnosis: "Arthrose",
    sentence: "Das Gelenk erinnerte sich an jeden Schritt, den er je gemacht hatte.",
    story:
      "Herr Meier hatte seit Jahren Schmerzen im Knie. Besonders beim Treppensteigen und nach längerer Belastung wurde es schlimmer. Das Gelenk war abgenutzt und entzündete sich immer wieder leicht. Die Schmerzen führten dazu, dass er sich weniger bewegte, wodurch alles noch schwieriger wurde."
  },
  {
    semester: "2. Semester",
    title: "Der unsichtbare Feind",
    diagnosis: "Rheumatoide Arthritis",
    sentence: "Ihre Hände kämpften gegen einen Feind, den niemand sehen konnte.",
    story:
      "Frau Lutz wachte oft mit steifen, geschwollenen Fingern auf. Die Beschwerden betrafen beide Hände und wurden erst nach längerer Bewegung besser. Es war nicht einfach Alter oder Überlastung. Ihr Immunsystem griff die Gelenke an und verursachte eine chronische Entzündung."
  },
  {
    semester: "2. Semester",
    title: "Die hohlen Knochen",
    diagnosis: "Osteoporose",
    sentence: "Der Knochen brach nicht am Sturz, sondern an seiner eigenen Leere.",
    story:
      "Frau Gasser stolperte über einen Teppichrand und fiel leicht auf die Seite. Trotzdem brach sie sich den Oberschenkelhals. Die Untersuchung zeigte, dass ihre Knochen stark entkalkt und brüchig waren. Die Krankheit hatte lange keine Schmerzen gemacht, bis der Knochen plötzlich nachgab."
  },
  {
    semester: "2. Semester",
    title: "Das wartende Blut",
    diagnosis: "Thrombose / Phlebothrombose",
    sentence: "In der Tiefe seines Beines stand das Blut still und wartete auf den falschen Moment.",
    story:
      "Nach einer Operation bewegte sich Herr Frei kaum. Eines Tages war sein Unterschenkel geschwollen, gespannt und schmerzte. In einer tiefen Vene hatte sich ein Blutgerinnsel gebildet. Gefährlich wurde es, weil sich ein Teil lösen und in die Lunge wandern konnte."
  },
  {
    semester: "2. Semester",
    title: "Der untreue Körper",
    diagnosis: "Inkontinenz",
    sentence: "Sie verlor nicht nur Urin, sondern immer mehr Vertrauen in ihren eigenen Körper.",
    story:
      "Frau Huber verlor immer wieder ungewollt Urin. Anfangs passierte es nur beim Husten oder Lachen, später auch plötzlich ohne Vorwarnung. Sie schämte sich und zog sich zurück. Die eigentliche Krankheit war nicht nur körperlich belastend, sondern nahm ihr immer mehr Freiheit."
  },
  {
    semester: "2. Semester",
    title: "Der leise Druck",
    diagnosis: "Hypertonie",
    sentence: "Der Druck stieg leise, bis die Stille gefährlich wurde.",
    story:
      "Herr Brunner hatte keine Schmerzen und keine auffälligen Beschwerden. Bei einer Kontrolle war der Blutdruck aber wiederholt deutlich erhöht. Die Gefahr lag darin, dass der hohe Druck über Jahre Herz, Gehirn, Nieren und Gefässe schädigen konnte. Sein Körper war leise unter Druck."
  },
  {
    semester: "2. Semester",
    title: "Das gebrochene Versprechen",
    diagnosis: "Herzinsuffizienz",
    sentence: "Sein Herz schlug noch, aber es hielt sein Versprechen nicht mehr.",
    story:
      "Frau Roth wurde bei kleinen Belastungen schnell kurzatmig. Abends waren ihre Beine geschwollen und nachts musste sie erhöht liegen. Ihr Herz pumpte nicht mehr stark genug. Dadurch staute sich Flüssigkeit im Körper und die Leistungsfähigkeit sank immer weiter."
  },
  {
    semester: "2. Semester",
    title: "Die versperrte Strasse",
    diagnosis: "Koronare Herzkrankheit / Herzinfarkt",
    sentence: "Ein Muskel schrie nach Luft, doch die Strasse zu ihm war versperrt.",
    story:
      "Herr Sommer spürte Druck auf der Brust, Übelkeit und Schmerzen, die in den linken Arm ausstrahlten. Er wollte erst abwarten. Doch seine Herzkranzgefässe waren verengt und ein Gefäss verschloss sich. Ein Teil des Herzmuskels bekam zu wenig Sauerstoff."
  },
  {
    semester: "2. Semester",
    title: "Der verlorene Morgen",
    diagnosis: "Apoplexie / Stroke",
    sentence: "Ein Teil von ihr war plötzlich da und doch nicht mehr erreichbar.",
    story:
      "Frau Berger stand am Frühstückstisch und plötzlich hing ein Mundwinkel herab. Sie konnte den rechten Arm kaum heben und sprach verwaschen. Im Gehirn war die Durchblutung gestört. Jede Minute war wichtig, weil Nervenzellen ohne Sauerstoff absterben können."
  },
  {
    semester: "2. Semester",
    title: "Das erloschene Licht",
    diagnosis: "Depression",
    sentence: "Die Welt wurde nicht dunkler, aber in ihm ging das Licht aus.",
    story:
      "Herr Kunz zog sich immer mehr zurück. Dinge, die ihm früher Freude machten, wirkten bedeutungslos. Er schlief schlecht, fühlte sich wertlos und konnte sich kaum aufraffen. Es war keine Faulheit, sondern eine ernsthafte psychische Erkrankung."
  },
  {
    semester: "2. Semester",
    title: "Sonne und Abgrund",
    diagnosis: "Bipolare Störung",
    sentence: "Erst flog sie zu nah an der Sonne, dann fiel sie tiefer als der Boden.",
    story:
      "Frau Senn erlebte Phasen, in denen sie extrem aktiv, euphorisch und risikofreudig war. Sie schlief kaum und fühlte sich unbesiegbar. Danach stürzte sie in tiefe Antriebslosigkeit und Hoffnungslosigkeit. Die Stimmung schwankte krankhaft zwischen Hochphasen und Depression."
  },
  {
    semester: "2. Semester",
    title: "Die Stimmen im Nichts",
    diagnosis: "Schizophrenie",
    sentence: "Die Stimmen kamen aus dem Nichts und waren doch lauter als alle Menschen im Raum.",
    story:
      "Herr Novak hörte Stimmen, die andere nicht hörten. Er war überzeugt, beobachtet und bedroht zu werden. Für ihn war diese Wahrnehmung nicht gespielt und nicht einfach Fantasie. Die Erkrankung veränderte sein Denken, seine Wahrnehmung und sein Erleben der Realität."
  },
  {
    semester: "2. Semester",
    title: "Rettung und Gefahr",
    diagnosis: "Borderline-Persönlichkeitsstörung",
    sentence: "Nähe war Rettung und Gefahr zugleich.",
    story:
      "Frau Weber erlebte Beziehungen sehr intensiv. Kleine Zurückweisungen fühlten sich für sie wie Verlassenwerden an. Ihre Stimmung wechselte rasch und sie verletzte sich manchmal selbst, um inneren Druck abzubauen. Hinter dem Verhalten standen grosse emotionale Instabilität und Angst."
  },
  {
    semester: "2. Semester",
    title: "Flucht ohne Verfolger",
    diagnosis: "Angststörung",
    sentence: "Sein Körper flüchtete, obwohl niemand ihn verfolgte.",
    story:
      "Herr Ali bekam plötzlich Herzrasen, Schweissausbrüche und Atemnot. Er war überzeugt, gleich zu sterben. Medizinisch fand man keine akute körperliche Ursache. Seine Angstreaktion war so stark, dass harmlose Situationen für ihn bedrohlich wurden."
  },
  {
    semester: "2. Semester",
    title: "Die Gefahr danach",
    diagnosis: "Posttraumatische Belastungsstörung",
    sentence: "Die Gefahr war vorbei, aber sein Körper hatte es nie erfahren.",
    story:
      "Herr Graf hatte einen schweren Verkehrsunfall überlebt. Danach kamen Albträume, Schreckhaftigkeit und Bilder, die sich aufdrängten. Bestimmte Geräusche lösten Panik aus. Sein Körper reagierte, als wäre die Gefahr noch immer da."
  },
  {
    semester: "3. Semester",
    title: "Das Gift im Inneren",
    diagnosis: "Niereninsuffizienz",
    sentence: "Als nichts mehr richtig hinausfand, blieb das Gift im Inneren zurück.",
    story:
      "Herr Schmid merkte, dass er kaum noch Wasser lösen konnte. Er war müde, die Beine schwollen an und ihm war übel. Seine Nieren filterten das Blut nicht mehr ausreichend. Dadurch sammelten sich Wasser und Abfallstoffe im Körper."
  },
  {
    semester: "3. Semester",
    title: "Die Schaufensterpause",
    diagnosis: "Periphere arterielle Verschlusskrankheit / PAVK",
    sentence: "Er blieb vor jedem Schaufenster stehen, doch er sah nie hinein.",
    story:
      "Herr Wyss bekam beim Gehen starke Schmerzen in den Waden. Nach kurzer Pause wurden sie besser. Die Arterien in den Beinen waren verengt und die Muskeln bekamen bei Belastung zu wenig Sauerstoff. Aus dem gemütlichen Stadtbummel wurde ein Warnsignal der Gefässe."
  },
  {
    semester: "3. Semester",
    title: "Der Zucker vor der Tür",
    diagnosis: "Diabetes mellitus Typ 1",
    sentence: "Der Zucker war überall, nur nicht dort, wo er gebraucht wurde.",
    story:
      "Der 17-jährige Nico musste ständig trinken und zur Toilette. Er nahm ab, obwohl er ass. Sein Körper bildete kaum noch Insulin und der Zucker blieb im Blut statt in die Zellen zu gelangen. Ohne Behandlung konnte daraus eine lebensgefährliche Entgleisung entstehen."
  },
  {
    semester: "3. Semester",
    title: "Die verschlossenen Türen",
    diagnosis: "Diabetes mellitus Typ 2",
    sentence: "Die Türen standen vor dem Zucker offen, aber niemand liess ihn hinein.",
    story:
      "Herr Ammann hatte lange erhöhte Blutzuckerwerte, bemerkte aber kaum etwas. Mit der Zeit kamen Müdigkeit, schlecht heilende Wunden und Kribbeln in den Füssen dazu. Seine Zellen reagierten schlechter auf Insulin. Die Krankheit entwickelte sich schleichend und betraf nach und nach Gefässe, Nerven und Organe."
  },
  {
    semester: "3. Semester",
    title: "Vier Warnlichter",
    diagnosis: "Metabolisches Syndrom",
    sentence: "Vier kleine Warnlichter blinkten gleichzeitig und niemand nannte es einen Unfall.",
    story:
      "Frau Gerber hatte Bauchfett, hohen Blutdruck, erhöhte Blutfette und schlechte Blutzuckerwerte. Jedes Problem für sich wirkte noch kontrollierbar. Zusammen erhöhten sie aber stark das Risiko für Diabetes und Herz-Kreislauf-Erkrankungen. Ihr Körper lief dauerhaft im Risikomodus."
  },
  {
    semester: "3. Semester",
    title: "Der Gast im Husten",
    diagnosis: "Tuberkulose",
    sentence: "Sein Husten blieb länger als jeder Gast und nachts weinte sein Körper Schweiss.",
    story:
      "Herr Demir hustete seit Wochen und nahm ungewollt ab. Nachts schwitzte er stark und fühlte sich erschöpft. Die Abklärung zeigte eine Tuberkulose der Lunge. Besonders wichtig war die Behandlung, weil die Krankheit ansteckend sein kann."
  },
  {
    semester: "3. Semester",
    title: "Beschädigte Botschaften",
    diagnosis: "Multiple Sklerose",
    sentence: "Die Botschaften kamen an, aber unterwegs wurden sie beschädigt.",
    story:
      "Frau Meier hatte schubweise neurologische Beschwerden. Manchmal kribbelten die Beine, manchmal sah sie verschwommen oder war stark erschöpft. Das Immunsystem griff Strukturen im zentralen Nervensystem an. Die Krankheit verlief in Schüben und war schwer vorhersehbar."
  },
  {
    semester: "3. Semester",
    title: "Der langsame Körper",
    diagnosis: "Morbus Parkinson",
    sentence: "Sein Wille bewegte sich schnell, sein Körper kam langsam hinterher.",
    story:
      "Herr Bühler bemerkte ein Zittern in der Hand, verlangsamte Bewegungen und eine steife Körperhaltung. Beim Gehen wurden die Schritte kleiner. In seinem Gehirn fehlte zunehmend Dopamin. Dadurch wurden Bewegungen schwerfälliger und alltägliche Handlungen immer langsamer."
  },
  {
    semester: "4. Semester",
    title: "Die unbrauchbare Luft",
    diagnosis: "COPD",
    sentence: "Die Luft war da, aber sie liess sich nicht mehr richtig benutzen.",
    story:
      "Herr Steiner hatte jahrelang geraucht. Zuerst hustete er nur morgens, später wurde jede Treppe zur Herausforderung. Er bekam immer schlechter Luft, besonders bei Belastung. Seine Atemwege waren chronisch verengt und entzündet. Das Ausatmen wurde für ihn schwerer als das Einatmen."
  },
  {
    semester: "4. Semester",
    title: "Die unsichtbare Faust",
    diagnosis: "Asthma bronchiale",
    sentence: "Etwas Unsichtbares zog die Luftwege zu wie eine Faust.",
    story:
      "Frau Keller bekam bei Pollen, Kälte und Stress plötzlich pfeifende Atmung und Engegefühl in der Brust. In solchen Momenten verkrampften sich ihre Bronchien und die Schleimhäute schwollen an. Nach dem Inhalieren wurde es besser. Zwischen den Anfällen wirkte sie oft völlig gesund."
  },
  {
    semester: "4. Semester",
    title: "Das Feuer in der Lunge",
    diagnosis: "Pneumonie",
    sentence: "In seiner Lunge brannte ein Feuer, das von aussen niemand sah.",
    story:
      "Herr Huber bekam Fieber, Husten und fühlte sich sehr schwach. Später atmete er schneller und hatte Schmerzen beim tiefen Einatmen. In der Lunge hatte sich eine Entzündung entwickelt. Besonders gefährlich wurde es, weil sein Körper nicht mehr genug Sauerstoff aufnehmen konnte."
  },
  {
    semester: "4. Semester",
    title: "Der falsche Ort",
    diagnosis: "Lungenembolie",
    sentence: "Ein Gerinnsel verliess den falschen Ort und nahm ihr plötzlich den Atem.",
    story:
      "Nach einer Operation hatte Frau Frei eine Thrombose im Bein. Ein Teil des Blutgerinnsels löste sich und wanderte mit dem Blutstrom in die Lunge. Plötzlich bekam sie Atemnot, Brustschmerzen und Angst. Ein Gefäss in der Lunge war verstopft und die Sauerstoffaufnahme wurde akut gestört."
  },
  {
    semester: "4. Semester",
    title: "Die vergessenen Atemzüge",
    diagnosis: "Schlafapnoe",
    sentence: "Jede Nacht vergass sein Körper für einen Moment das Atmen.",
    story:
      "Herr Brunner schnarchte laut und hatte immer wieder Atempausen im Schlaf. Seine Partnerin merkte, dass er nachts plötzlich still wurde und dann nach Luft schnappte. Am Tag war er müde und unkonzentriert. Während des Schlafs kollabierten die Atemwege wiederholt teilweise oder ganz."
  },
  {
    semester: "4. Semester",
    title: "Der schweigende Knoten",
    diagnosis: "Mammakarzinom",
    sentence: "Der Knoten schwieg, aber sein Schweigen war verdächtig.",
    story:
      "Frau Roth ertastete beim Duschen eine Verhärtung in der Brust. Sie hatte keine Schmerzen und wollte zuerst abwarten. Bei der Abklärung zeigte sich ein bösartiger Tumor. Die Diagnose traf sie hart, weil der Körper lange kaum Warnzeichen gezeigt hatte."
  },
  {
    semester: "4. Semester",
    title: "Der lange Weg in der Nacht",
    diagnosis: "Prostatakarzinom",
    sentence: "Die Nächte wurden kürzer und der Weg zur Toilette immer länger.",
    story:
      "Herr Wyss musste nachts häufig Wasser lösen und der Harnstrahl wurde schwächer. Lange schob er es aufs Alter. Bei der Untersuchung zeigte sich ein Tumor der Prostata. Die Krankheit entwickelte sich langsam und blieb anfangs fast unbemerkt."
  },
  {
    semester: "4. Semester",
    title: "Der Krieg im Bauch",
    diagnosis: "Morbus Crohn",
    sentence: "Sein Darm führte einen Krieg, der in Schüben kam.",
    story:
      "Herr Demir hatte immer wieder starke Bauchschmerzen, Durchfälle und verlor Gewicht. Die Beschwerden kamen in Schüben. Im Darm entzündeten sich Abschnitte chronisch, manchmal mit Fisteln oder Engstellen. Für andere wirkte er nur «oft krank», für ihn war jeder Schub ein Ausnahmezustand."
  },
  {
    semester: "4. Semester",
    title: "Die offene Entscheidung",
    diagnosis: "Chronische Wunde / Ulcus cruris / Dekubitus",
    sentence: "Die Haut öffnete sich und entschied, nicht mehr zurückzukehren.",
    story:
      "Frau Gerber hatte eine Wunde am Unterschenkel, die über Wochen offen blieb. Die Haut war gereizt, die Wunde nässte und heilte schlecht. Durch Durchblutungsprobleme und Druck bekam das Gewebe zu wenig Versorgung. Aus einer alltäglichen Verletzung wurde ein chronisches Pflegeproblem."
  },
  {
    semester: "4. Semester",
    title: "Die verlorenen Wege",
    diagnosis: "Demenz",
    sentence: "Er verlor nicht Erinnerungen, sondern langsam die Wege zu ihnen.",
    story:
      "Herr Baumann vergass Termine, verlegte Dinge und fand später den Heimweg nicht mehr. Anfangs konnte er vieles überspielen. Mit der Zeit wurden Orientierung, Denken und Alltagshandlungen schwieriger. Die Veränderungen waren nicht normale Vergesslichkeit, sondern Zeichen einer fortschreitenden Erkrankung des Gehirns."
  },
  {
    semester: "4. Semester",
    title: "Die fliehende Gegenwart",
    diagnosis: "Alzheimer-Demenz",
    sentence: "Die Vergangenheit blieb sitzen, während die Gegenwart immer wieder ging.",
    story:
      "Frau Schmid konnte sich neue Informationen kaum merken. Alte Erinnerungen waren lange noch lebendig, aber der aktuelle Tag zerfiel in Lücken. Später kamen Sprachprobleme und Orientierungslosigkeit dazu. Bei Alzheimer sterben Nervenzellen im Gehirn fortschreitend ab."
  },
  {
    semester: "4. Semester",
    title: "Die stummen Einschläge",
    diagnosis: "Vaskuläre Demenz",
    sentence: "Kleine stumme Einschläge im Gehirn nahmen ihm Stück für Stück den Alltag.",
    story:
      "Herr Graf hatte mehrere kleine Durchblutungsstörungen im Gehirn. Danach veränderte sich seine Leistungsfähigkeit stufenweise. Mal war er klar, mal sehr verlangsamt und unkonzentriert. Die Demenz entstand durch geschädigte Blutgefässe und wiederholte kleine Hirnschäden."
  },
  {
    semester: "4. Semester",
    title: "Die verkleidete Welt",
    diagnosis: "Delir",
    sentence: "Am Morgen war die Welt noch echt, am Abend hatte sie sich verkleidet.",
    story:
      "Frau Meier war nach einer Operation plötzlich verwirrt. Sie wusste nicht mehr, wo sie war, sah Dinge, die nicht da waren und wechselte zwischen Unruhe und Schläfrigkeit. Die Veränderung kam akut und schwankte stark. Auslöser konnten Infekt, Schmerzen, Medikamente, Flüssigkeitsmangel oder die Operation sein."
  },
  {
    semester: "5. Semester",
    title: "Das Gewitter im Kopf",
    diagnosis: "Epilepsie",
    sentence: "Nach dem Gewitter lag er am Boden, doch kein Blitz hatte ihn getroffen.",
    story:
      "Herr Novak hatte plötzlich einen Krampfanfall. Er verlor das Bewusstsein, fiel zu Boden und zuckte am ganzen Körper. Danach war er erschöpft und verwirrt. Im Gehirn hatten Nervenzellen plötzlich unkontrolliert elektrische Signale abgegeben."
  },
  {
    semester: "5. Semester",
    title: "Der fallende Kaffee",
    diagnosis: "Apoplexie / Stroke",
    sentence: "Der Kaffee fiel zuerst. Dann fiel auf, dass sein Arm nicht mehr gehorchte.",
    story:
      "Herr Kunz bekam plötzlich eine Halbseitenlähmung und konnte kaum sprechen. Sein Gesicht war einseitig schief. Im Gehirn war ein Gefäss verschlossen oder geplatzt. Weil Gehirnzellen sehr schnell Schaden nehmen, musste sofort gehandelt werden."
  },
  {
    semester: "5. Semester",
    title: "Nicht heute",
    diagnosis: "Abhängigkeitserkrankung / Sucht",
    sentence: "Er sagte, er könne jederzeit aufhören und meinte damit nie heute.",
    story:
      "Herr Keller konsumierte weiter, obwohl Arbeit, Beziehungen und Gesundheit litten. Er brauchte immer mehr, dachte ständig daran und verlor die Kontrolle. Es ging nicht mehr um Genuss, sondern um Zwang, Gewöhnung und Vermeidung von Entzug."
  },
  {
    semester: "5. Semester",
    title: "Der Schlüssel im Glas",
    diagnosis: "Alkoholabhängigkeit",
    sentence: "Aus einem Glas wurde ein Schlüssel und irgendwann passte er in jedes Schloss des Tages.",
    story:
      "Frau Berger trank anfangs nur abends. Später begann sie schon am Morgen, um Zittern und Unruhe zu dämpfen. Sie versteckte Flaschen und verharmloste die Menge. Der Alkohol bestimmte zunehmend ihren Alltag und ihr Körper reagierte ohne Alkohol mit Entzugssymptomen."
  },
  {
    semester: "5. Semester",
    title: "Die Tablette befiehlt",
    diagnosis: "Medikamentenabhängigkeit",
    sentence: "Die Tablette sollte Ruhe bringen, doch am Ende gab sie die Befehle.",
    story:
      "Herr Frei erhielt nach einer Krise Schlaf- und Beruhigungsmittel. Anfangs nahm er sie nach Verordnung, später häufiger und in höherer Dosis. Ohne Tabletten wurde er unruhig und konnte nicht schlafen. Die Grenze zwischen Behandlung und Abhängigkeit wurde schleichend überschritten."
  },
  {
    semester: "5. Semester",
    title: "Das Ende des Mangels",
    diagnosis: "Drogenabhängigkeit",
    sentence: "Er suchte den Rausch nicht mehr, sondern nur noch das Ende des Mangels.",
    story:
      "Nico konsumierte regelmässig Drogen. Mit der Zeit brauchte er mehr, um überhaupt noch zu funktionieren. Schule, Freunde und Körperpflege wurden unwichtiger. Die Substanz bestimmte seinen Tagesablauf, sein Denken und seine Entscheidungen."
  },
  {
    semester: "5. Semester",
    title: "Der Kampf hinter dem Teller",
    diagnosis: "Essstörungen",
    sentence: "Der Teller war voll, aber der Kampf fand woanders statt.",
    story:
      "Frau Lutz wirkte nach aussen kontrolliert. Innerlich drehte sich aber fast alles um Essen, Gewicht und Schuldgefühle. Mal ass sie kaum, mal verlor sie die Kontrolle. Eine Essstörung ist nicht einfach eine Frage von Disziplin, sondern eine ernsthafte psychische Erkrankung."
  },
  {
    semester: "5. Semester",
    title: "Der lügende Spiegel",
    diagnosis: "Anorexia nervosa",
    sentence: "Der Spiegel zeigte das Gegenteil der Realität.",
    story:
      "Lea ass immer weniger und zählte jede Kalorie. Obwohl sie stark abnahm, fühlte sie sich zu dick. Sport wurde zur Pflicht, Essen zur Bedrohung. Ihr Körper geriet in einen Mangelzustand, während sie selbst die Gefahr kaum wahrhaben konnte."
  },
  {
    semester: "5. Semester",
    title: "Ungeschehen",
    diagnosis: "Bulimia nervosa",
    sentence: "Was sie verschlang, wollte sie sofort wieder ungeschehen machen.",
    story:
      "Frau Senn hatte wiederkehrende Essanfälle. Danach schämte sie sich stark und versuchte, das Essen durch Erbrechen oder andere Massnahmen «rückgängig» zu machen. Ihr Gewicht konnte dabei unauffällig bleiben. Trotzdem waren Körper und Psyche stark belastet."
  },
  {
    semester: "5. Semester",
    title: "Das satte Schweigen",
    diagnosis: "Binge-Eating-Disorder",
    sentence: "Er ass, bis das Schweigen in ihm für einen Moment satt war.",
    story:
      "Herr Ali hatte immer wieder Essanfälle, bei denen er grosse Mengen in kurzer Zeit ass. Danach fühlte er sich schuldig und beschämt. Im Unterschied zur Bulimie versuchte er das Essen nicht regelmässig durch Erbrechen oder Abführen auszugleichen. Das Essen wurde zur Bewältigung von innerem Druck."
  },
  {
    semester: "5. Semester",
    title: "Die leise Abwehr",
    diagnosis: "HIV / AIDS",
    sentence: "Das Virus blieb lange leise, bis die Abwehr keine Antwort mehr hatte.",
    story:
      "Herr Sommer lebte längere Zeit mit einer unbehandelten HIV-Infektion. Das Virus schwächte nach und nach sein Immunsystem. Als die Abwehr stark geschädigt war, traten Infektionen auf, mit denen ein gesunder Körper besser umgehen könnte. In diesem Stadium sprach man von AIDS."
  },
  {
    semester: "5. Semester",
    title: "Die geteilte Wahrheit",
    diagnosis: "Sexuell übertragbare Infektionen",
    sentence: "Es begann dort, wo niemand gerne hinschaut und endete mit einer Wahrheit, die geteilt werden musste.",
    story:
      "Herr Meier bemerkte Brennen beim Wasserlösen und ungewöhnlichen Ausfluss. Zuerst hoffte er, es gehe von alleine weg. Die Abklärung zeigte eine sexuell übertragbare Infektion. Wichtig waren Behandlung, Schutz und das Informieren möglicher Sexualpartnerinnen oder Sexualpartner."
  }
];

const SEMESTERS = ["Alle Semester", "1. Semester", "2. Semester", "3. Semester", "4. Semester", "5. Semester"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function RuleModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-red-900/60 bg-zinc-950 shadow-2xl shadow-red-950/40"
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 10, opacity: 0 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.35),transparent_45%)]" />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-zinc-700 bg-zinc-900/80 p-2 text-zinc-300 hover:border-red-600 hover:text-white"
          aria-label="Regeln schliessen"
        >
          <X size={18} />
        </button>
        <div className="relative p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl border border-red-800 bg-red-950/70 p-3 text-red-200">
              <Skull size={28} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-red-300/80">Vor dem Start</p>
              <h2 className="text-2xl font-black text-zinc-50">Regeln der FaGe-Blackstory</h2>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-zinc-800 bg-black/40 p-5 text-zinc-200">
            <p>• Lesen Sie den Beispielsatz vor.</p>
            <p>• Die Spieler müssen die Diagnose und die Geschichte dahinter erraten.</p>
            <p>• Die Spieler stellen geschlossene Fragen. Die Spielleitung darf nur mit Ja/Nein antworten.</p>
          </div>
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-2xl bg-red-700 px-5 py-4 font-bold text-white shadow-lg shadow-red-950/50 transition hover:bg-red-600"
          >
            Story starten
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Header({ onRules }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/70 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(220,38,38,0.32),transparent_35%),radial-gradient(circle_at_80%_25%,rgba(120,53,15,0.22),transparent_35%)]" />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-950/40 blur-3xl" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-900/70 bg-black/40 px-4 py-2 text-sm text-red-200">
            <Moon size={16} />
            Dunkle Fallrätsel für FaGe
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-zinc-50 md:text-6xl">
            FaGe-Blackstory-App
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
            Wählen Sie ein Semester, öffnen Sie eine mysteriöse Story und lassen Sie die Gruppe die Diagnose erraten.
          </p>
        </div>
        <button
          onClick={onRules}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-800 bg-red-950/50 px-5 py-3 font-bold text-red-100 transition hover:bg-red-900/70"
        >
          <BookOpen size={18} /> Regeln anzeigen
        </button>
      </div>
    </div>
  );
}

function SemesterSelector({ selectedSemester, setSelectedSemester, counts }) {
  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-4 shadow-xl shadow-black/50">
      <label htmlFor="semester-select" className="mb-3 flex items-center gap-2 px-1 text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">
        <Filter size={16} /> Semester wählen
      </label>
      <div className="relative">
        <select
          id="semester-select"
          value={selectedSemester}
          onChange={(event) => setSelectedSemester(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-red-900/70 bg-black/70 px-5 py-4 pr-12 text-lg font-black text-zinc-50 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-950"
        >
          {SEMESTERS.map((semester) => (
            <option key={semester} value={semester} className="bg-zinc-950 text-zinc-50">
              {semester} · {counts[semester] ?? STORIES.length} Storys
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-red-300">
          ▾
        </div>
      </div>
      <p className="mt-3 px-1 text-sm text-zinc-500">
        Aktuelle Auswahl: <span className="font-bold text-red-200">{selectedSemester}</span>
      </p>
    </div>
  );
}

function StoryCard({ story, onClick }) {
  return (
    <motion.button
      layout
      onClick={() => onClick(story)}
      className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-left shadow-xl shadow-black/50 transition hover:-translate-y-1 hover:border-red-800 hover:bg-zinc-900"
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,29,29,0.22),transparent_45%)] opacity-0 transition group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-200">
            {story.semester}
          </span>
          <Skull size={18} className="text-zinc-700 transition group-hover:text-red-500" />
        </div>
        <h3 className="text-xl font-black text-zinc-50">{story.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{story.sentence}</p>
      </div>
    </motion.button>
  );
}

function StoryView({ story, onBack }) {
  const [showDiagnosis, setShowDiagnosis] = useState(true);

  return (
    <>
      <button
        onClick={onBack}
        className="fixed left-4 top-4 z-40 inline-flex items-center gap-2 rounded-2xl border border-red-900/80 bg-black/85 px-4 py-3 text-sm font-black text-zinc-100 shadow-xl shadow-black/70 backdrop-blur transition hover:border-red-600 hover:bg-red-950/80"
      >
        <ChevronLeft size={18} /> Zurück
      </button>
    <motion.div
      className="rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/70"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
    >
      <div className="relative overflow-hidden rounded-t-[2rem] border-b border-zinc-800 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.26),transparent_45%)]" />
        <div className="relative">
          <div className="flex flex-col gap-3 pt-12 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-red-300/80">{story.semester}</p>
              <h2 className="mt-2 text-3xl font-black text-zinc-50 md:text-5xl">{story.title}</h2>
            </div>
            <button
              onClick={() => setShowDiagnosis((v) => !v)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm font-bold text-zinc-300 transition hover:border-red-800 hover:text-white"
            >
              {showDiagnosis ? <EyeOff size={17} /> : <Eye size={17} />}
              {showDiagnosis ? "Diagnose ausblenden" : "Diagnose anzeigen"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6 md:p-8">
        <section className="rounded-3xl border border-red-900/60 bg-black/50 p-6 shadow-inner shadow-red-950/20">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-950/70 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-200">
            <Sparkles size={14} /> Diesen Satz den Spielern vorlesen
          </div>
          <p className="text-2xl font-black leading-snug text-zinc-50 md:text-3xl">«{story.sentence}»</p>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">Geschichte für die Spielleitung</h3>
          <p className="text-lg leading-relaxed text-zinc-200">{story.story}</p>
        </section>

        <AnimatePresence initial={false}>
          {showDiagnosis && (
            <motion.section
              className="rounded-3xl border border-red-800 bg-red-950/50 p-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-red-200">Diagnose</h3>
              <p className="text-3xl font-black text-white">{story.diagnosis}</p>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </>
  );
}

export default function FageBlackstoryApp() {
  const [selectedSemester, setSelectedSemester] = useState("Alle Semester");
  const [query, setQuery] = useState("");
  const [activeStory, setActiveStory] = useState(null);
  const [rulesOpen, setRulesOpen] = useState(true);
  const [pendingStory, setPendingStory] = useState(null);

  const counts = useMemo(() => {
    const result = { "Alle Semester": STORIES.length };
    STORIES.forEach((story) => {
      result[story.semester] = (result[story.semester] || 0) + 1;
    });
    return result;
  }, []);

  const filteredStories = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    return STORIES.filter((story) => {
      const semesterMatches = selectedSemester === "Alle Semester" || story.semester === selectedSemester;
      const queryMatches =
        !normalisedQuery ||
        story.title.toLowerCase().includes(normalisedQuery) ||
        story.diagnosis.toLowerCase().includes(normalisedQuery) ||
        story.sentence.toLowerCase().includes(normalisedQuery);
      return semesterMatches && queryMatches;
    });
  }, [selectedSemester, query]);

  function openStory(story) {
    setPendingStory(story);
    setRulesOpen(true);
  }

  function closeRules() {
    setRulesOpen(false);
    if (pendingStory) {
      setActiveStory(pendingStory);
      setPendingStory(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,29,29,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(39,39,42,0.7),transparent_38%)]" />
      <div className="fixed inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />

      <main className="relative mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8 md:py-10">
        <Header onRules={() => setRulesOpen(true)} />

        <AnimatePresence mode="wait">
          {activeStory ? (
            <StoryView key="story" story={activeStory} onBack={() => setActiveStory(null)} />
          ) : (
            <motion.div key="list" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SemesterSelector selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} counts={counts} />

              <div className="flex flex-col gap-3 rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-4 shadow-xl shadow-black/50 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-zinc-50">Story-Auswahl</h2>
                  <p className="text-sm text-zinc-500">{filteredStories.length} passende Blackstorys</p>
                </div>
                <div className="relative w-full md:max-w-sm">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Titel oder Diagnose suchen..."
                    className="w-full rounded-2xl border border-zinc-800 bg-black/50 py-3 pl-11 pr-4 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-red-700"
                  />
                </div>
              </div>

              <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence>
                  {filteredStories.map((story) => (
                    <StoryCard key={`${story.semester}-${story.diagnosis}`} story={story} onClick={openStory} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredStories.length === 0 && (
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center text-zinc-400">
                  Keine Story gefunden. Ändern Sie die Suche oder wählen Sie ein anderes Semester.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>{rulesOpen && <RuleModal onClose={closeRules} />}</AnimatePresence>
    </div>
  );
}
