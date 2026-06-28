'use client';

import { useState } from 'react';

type LyricVariant = { label: string; text: string };

const hindiLyrics = `कह दिया सब ठीक है पर ठीक था ही नहीं
तू मेरे सामने थी पर मैं वहाँ था ही नहीं

हाथ तेरा थामा था पर थामे रह न सका
जो बात दिल में थी वो तुझसे कह न सका

तूने रोका था मुझे मैं रुक भी न सका
तू कुछ कहती रही पर सुन ही न सका

तूने कहा था मुझे छोड़ न देना
मैं हाँ कह के भी रुक न सका

तूने कहा था मुझे तोड़ न देना
मैं पास होकर भी दूर ही रहा

अब भी कभी यूँ ही तेरा ख्याल आता है
कुछ भी नहीं होता पर दिल भर आता है

मैंने खुद ही छोड़ा था फिर लौटता क्यों हूँ
जो पीछे रह गया था उसी में लौटता क्यों हूँ

मैंने आसान रास्ता उस दिन चुन लिया था
जो दिल के सबसे पास था उसे ही छोड़ दिया था

तूने कहा था मुझे छोड़ न देना
मैं हाँ कह के भी रुक न सका

तूने कहा था मुझे तोड़ न देना
मैं पास होकर भी दूर ही रहा

अब सोचूँ तो लगता है सब साफ था तभी
तू बस यही चाहती थी मैं रुक जाऊँ यहीं

अब सोचूँ तो लगता है तू ठीक कहती थी
मैं सुनता सब रहा पर ठहरा ही नहीं

तूने कहा था… मुझे छोड़ न देना…
मैं हाँ कह के भी… रुक न सका…

तूने कहा था… मुझे तोड़ न देना…
मैं पास होकर भी… दूर ही रहा…`;

const englishLyrics = `I said I'm fine
but I wasn't really
you stood right in front of me
but I wasn't there, not really

I held your hand
but I couldn't hold on
everything I had to say
I never said it out loud

you tried to stop me
I still remember that
I could've stayed back then
but I just didn't

you told me
don't let me go
even when I said I wouldn't
I still couldn't stay

you told me
don't break me like this
even when I was right there
I was already gone

sometimes even now
you just cross my mind
nothing really happens
but my chest feels tight

I was the one who left
so why do I go back
to the place I walked away from
why do I keep going back

I chose the easier road
that day without thinking
and the one thing that mattered most
I was the one who left it

you told me
don't let me go
even when I said I wouldn't
I still couldn't stay

you told me
don't break me like this
even when I was right there
I was already gone

now when I think about it
it was all clear back then
you only wanted one thing
that I'd just stay

you were right about it
I can see it now
I heard every word you said
but I never stayed

you told me…
don't let me go…
even when I said I wouldn't…
I still couldn't stay…

you told me…
don't break me like this…
even when I was right there…
I was already gone…`;

const hoJaataHaiLyrics = `aajkal sab theek hai waise
kaam bhi dheere chal raha hai
shehar bhi halka lagta hai
din bhi nikal raha hai
bas jab tu saamne aati hai
sab kuch dheema ho jaata hai
main jo kehna chahta hoon
woh dil mein hi reh jaata hai
teri awaaz ke aage
lafzon ko dhoondta raha
tu bolti gayi
main sunta raha

pata nahi yeh kya tha
par achha lagta hai
tu paas ho zara sa
toh dil aur dhadakta hai

tera naam jab aata hai
dil chupke se muskuraata hai
tu dekhe jo ek baar
din saara roshan ho jaata hai
tera naam jab aata hai
kuch toh badal sa jaata hai
main main nahi rehta
dil tera sa ho jaata hai

teri baaton mein jaise
koi narmi si ghulti hai
tu hans ke jo dekhe
shaam thodi si rukti hai
tere jhumke jab hilte hain
halki si unki aahat mein
main kho sa jaata hoon
teri har ek baat mein
woh safed si kurti
woh dheema sa andaaz
tu simple si lagti hai
par dil pe karti raaz

pata nahi yeh kya tha
par achha lagta hai
tu paas ho zara sa
toh dil aur dhadakta hai

tera naam jab aata hai
dil chupke se muskuraata hai
tu dekhe jo ek baar
din saara roshan ho jaata hai
tera naam jab aata hai
kuch toh badal sa jaata hai
main main nahi rehta
dil tera sa ho jaata hai

main kehna bhi chaahun
toh keh nahi paata
tu saamne hoti hai
main reh nahi paata
thoda sa darr hai
thodi si baat hai
shayad yahi toh
pehli mulaqaat hai

tera naam jab aata hai
dil chupke se muskuraata hai
tu dekhe jo ek baar
din saara roshan ho jaata hai
tera naam jab aata hai
kuch toh badal sa jaata hai
main main nahi rehta
dil tera sa ho jaata hai`;

const hoJaataHaiEnglish = `these days everything's fine, sort of
work's ticking along slowly too
the city feels lighter
the days keep passing
it's just when you come in front of me
everything goes quiet and slow
the things I want to say
stay stuck inside my heart
against your voice
I kept searching for words
you kept talking
I kept listening

I don't know what this was
but it feels good
when you're just a little close
my heart beats harder

when your name comes up
my heart quietly smiles
if you just look once
the whole day lights up
when your name comes up
something quietly shifts
I stop being myself
my heart turns a little like yours

in the way you talk
a softness seems to melt
when you look and smile
the evening pauses a little
when your earrings sway
in their faint little sound
I get a little lost
in every word you say
that white kurti
that quiet way about you
you seem so simple
but you work secrets on my heart

I don't know what this was
but it feels good
when you're just a little close
my heart beats harder

when your name comes up
my heart quietly smiles
if you just look once
the whole day lights up
when your name comes up
something quietly shifts
I stop being myself
my heart turns a little like yours

even when I want to say it
the words don't come out
when you're in front of me
I can't hold myself together
there's a little fear
a little something unsaid
maybe this is
what a first meeting feels like

when your name comes up
my heart quietly smiles
if you just look once
the whole day lights up
when your name comes up
something quietly shifts
I stop being myself
my heart turns a little like yours`;

const lyricsBySlug: Record<string, LyricVariant[]> = {
  'tune-kaha-tha': [
    { label: 'hindi', text: hindiLyrics },
    { label: 'english', text: englishLyrics },
  ],
  'ho-jaata-hai': [
    { label: 'hindi', text: hoJaataHaiLyrics },
    { label: 'english', text: hoJaataHaiEnglish },
  ],
};

export function Lyrics({ slug }: { slug: string }) {
  const variants = lyricsBySlug[slug];
  const [active, setActive] = useState(0);

  if (!variants?.length) return null;

  const current = variants[Math.min(active, variants.length - 1)];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          lyrics
        </h2>
        {variants.length > 1 && (
          <>
            <span className="text-neutral-300 dark:text-neutral-700 mx-1">
              —
            </span>
            <div className="flex gap-1">
              {variants.map((variant, i) => (
                <button
                  key={variant.label}
                  onClick={() => setActive(i)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-colors duration-150 ${
                    i === active
                      ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium'
                      : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300'
                  }`}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <pre className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg whitespace-pre-wrap font-[inherit]">
        {current.text}
      </pre>
    </div>
  );
}
