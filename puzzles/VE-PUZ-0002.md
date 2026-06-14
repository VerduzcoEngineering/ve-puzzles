## Why it dies

An LED is a **diode**: its current rises *exponentially* once you pass the
forward voltage $V_f$ (≈ 2 V for a red LED). It does **not** limit its own
current the way a resistor does. The Shockley model captures the steepness:

$$ I = I_S\left(e^{\,V/(n V_T)} - 1\right) $$

Put 5 V across a 2 V device and the only thing holding current back is wire and
source resistance — milliohms. Current slams to hundreds of mA, far past the
~20 mA rating. Worse, it runs away: the junction heats, $V_f$ *falls* with
temperature, so current climbs *further*. The die cooks in milliseconds — that
"one bright flash, then dark" is the signature.

## The fix

Add a series resistor to set the operating current:

$$ R = \frac{V_\text{supply} - V_f}{I} = \frac{5\ \text{V} - 2\ \text{V}}{10\ \text{mA}} = 300\ \Omega \rightarrow 330\ \Omega\ (\text{E12}) $$

Resistor dissipation is tiny — $I^2R = (0.01)^2 \times 330 = 33\ \text{mW}$ — so a
1/8 W part is plenty. The resistor's **load line** intersects the diode curve at
a safe operating point:

<figure>
<svg viewBox="0 0 480 320" role="img" aria-label="Diode I-V curve with and without a series resistor" style="max-width:100%;height:auto;font-family:var(--font-mono,monospace);font-size:11px">
  <!-- axes -->
  <line x1="60" y1="40" x2="60" y2="270" stroke="currentColor" stroke-width="1.5"/>
  <line x1="60" y1="270" x2="440" y2="270" stroke="currentColor" stroke-width="1.5"/>
  <text x="44" y="46" fill="currentColor" text-anchor="end">I (mA)</text>
  <text x="438" y="288" fill="currentColor" text-anchor="end">V (V)</text>
  <!-- 20 mA rating line -->
  <line x1="60" y1="155" x2="440" y2="155" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>
  <text x="446" y="159" fill="currentColor" opacity="0.7">20 mA max</text>
  <!-- Vf tick -->
  <text x="212" y="286" fill="currentColor" text-anchor="middle" opacity="0.8">2 V (Vf)</text>
  <!-- diode I-V curve -->
  <path d="M60,270 L197,269 L208,258 L212,224 L216,155 L219,70 L221,44"
        fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="226" y="58" fill="currentColor">diode I–V</text>
  <!-- no-resistor runaway arrow -->
  <line x1="221" y1="120" x2="221" y2="50" stroke="var(--accent,#c8430a)" stroke-width="2"/>
  <polygon points="221,42 217,54 225,54" fill="var(--accent,#c8430a)"/>
  <text x="232" y="110" fill="var(--accent,#c8430a)">no R → runaway</text>
  <!-- 330 ohm load line: (0V,15.2mA)->(5V,0mA) -->
  <line x1="60" y1="183" x2="440" y2="270" stroke="#2f9e44" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="330" y="250" fill="#2f9e44">330 Ω load line</text>
  <!-- safe operating point ~ (2V, 9mA) -->
  <circle cx="212" cy="218" r="5" fill="#2f9e44"/>
  <text x="150" y="210" fill="#2f9e44" text-anchor="end">~9 mA, safe</text>
</svg>
<figcaption>Without a resistor the LED sits on the near-vertical part of its
curve — current explodes. The 330&nbsp;Ω load line pins the operating point to a
safe ~9&nbsp;mA.</figcaption>
</figure>

## Why the other choices are wrong

- **LED backwards** — it just wouldn't light; it wouldn't flash then die.
- **GPIO can't source enough** — the opposite failure; that gives a dim LED, not a burnout.
- **Flyback diode** — that's for inductive loads (relays, motors), not an LED.

## Takeaway

Every LED on a voltage source needs current limiting. Reach for the series
resistor first; for tight efficiency or many LEDs, a constant-current driver.
