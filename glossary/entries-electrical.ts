import type { GlossaryEntry } from './types';

export const electricalTerms: GlossaryEntry[] = [
  {
    term: 'Admittance',
    definition:
      'The reciprocal of impedance, in siemens. Its real part is conductance and its imaginary part susceptance. Convenient for parallel networks, where admittances simply add.',
    category: 'fundamentals',
    page: 'complex-impedance',
    see: ['Impedance', 'Susceptance'],
  },
  {
    term: 'Ampacity',
    definition:
      'The current a conductor may carry continuously without exceeding its temperature rating. Set by insulation, bundling, ambient temperature and installation method rather than by the conductor alone, so it comes from tables in a standard rather than from a formula.',
    category: 'fundamentals',
    page: 'wire-and-cable',
  },
  {
    term: 'Ampere',
    expansion: 'A',
    definition:
      'The SI unit of electric current: one coulomb of charge per second. Defined since 2019 by fixing the elementary charge, rather than by the force between two conductors.',
    category: 'fundamentals',
    page: 'ohms-law',
  },
  {
    term: 'Bandgap reference',
    definition:
      'A voltage reference that cancels the temperature drift of a semiconductor junction against a term of opposite sign, giving an output near the silicon bandgap voltage of about 1.2 V that is stable over temperature.',
    category: 'fundamentals',
  },
  {
    term: 'Capacitance',
    expansion: 'C',
    definition:
      'The charge stored per volt applied, in farads. A capacitor passes changing voltages and blocks steady ones; current flows only while the voltage is changing.',
    category: 'fundamentals',
    page: 'capacitors',
    see: ['Dielectric', 'ESR'],
  },
  {
    term: 'Conductance',
    expansion: 'G',
    definition: 'The reciprocal of resistance, in siemens. The real part of admittance.',
    category: 'fundamentals',
    see: ['Admittance'],
  },
  {
    term: 'Coulomb',
    expansion: 'C',
    definition:
      'The SI unit of electric charge. One ampere flowing for one second transfers one coulomb.',
    category: 'fundamentals',
  },
  {
    term: 'Creepage and clearance',
    definition:
      'Creepage is the shortest path along a surface between two conductors; clearance is the shortest path through air. Both are specified by safety standards according to voltage, pollution degree and altitude, and creepage is usually the binding constraint.',
    category: 'fundamentals',
    page: 'pcb-traces',
  },
  {
    term: 'Crest factor',
    definition:
      'Peak divided by RMS. It says how much headroom a system needs beyond its average power handling. A sine is 1.414, a square wave 1.0, and speech or a pulse train can exceed 4.',
    category: 'fundamentals',
    page: 'ac-fundamentals',
    see: ['RMS'],
  },
  {
    term: 'Current divider',
    definition:
      'Parallel branches share current in inverse proportion to their resistances, so the lowest-resistance path carries the most. The counterpart of the voltage divider.',
    category: 'fundamentals',
    page: 'series-parallel-resistors',
  },
  {
    term: 'DC bias (capacitors)',
    definition:
      'The loss of capacitance in class-II ceramic capacitors as DC voltage is applied. A 10 µF X5R part can measure under 3 µF at its working voltage. Inherent to the dielectric, not a fault, and the reason timing circuits use C0G or film.',
    category: 'fundamentals',
    page: 'capacitors',
  },
  {
    term: 'Derating',
    definition:
      'Operating a component below its maximum rating to gain margin and life. Ratings are quoted at a stated ambient temperature and must be reduced above it along a curve in the datasheet.',
    category: 'fundamentals',
    page: 'dc-power',
  },
  {
    term: 'Dielectric',
    definition:
      'The insulating material between a capacitor\'s plates, or between a transmission line\'s conductors. Its permittivity sets capacitance and propagation velocity; its loss tangent sets how much energy it absorbs.',
    category: 'fundamentals',
    page: 'capacitors',
    see: ['Permittivity', 'Loss tangent'],
  },
  {
    term: 'E series',
    definition:
      'The preferred value series for passive components — E6, E12, E24, E48, E96, E192 — spaced logarithmically so that consecutive values are roughly one tolerance band apart. The reason 4.7 kΩ exists and 4.5 kΩ does not.',
    category: 'fundamentals',
    page: 'resistor-values',
  },
  {
    term: 'ESL',
    expansion: 'Equivalent series inductance',
    definition:
      'The parasitic inductance of a real capacitor, from its leads and internal structure. Above the self-resonant frequency it dominates and the capacitor behaves as an inductor.',
    category: 'fundamentals',
    page: 'capacitors',
    see: ['Self-resonant frequency'],
  },
  {
    term: 'ESR',
    expansion: 'Equivalent series resistance',
    definition:
      'The parasitic resistance of a real capacitor. It causes heating under ripple current and limits how fast the capacitor can supply a transient. High in electrolytics, very low in ceramics.',
    category: 'fundamentals',
    page: 'capacitors',
  },
  {
    term: 'Farad',
    expansion: 'F',
    definition:
      'The SI unit of capacitance: one coulomb per volt. An enormous unit in practice — working values run from picofarads to millifarads.',
    category: 'fundamentals',
    page: 'capacitors',
  },
  {
    term: 'Flyback',
    definition:
      'The voltage spike produced when current through an inductor is interrupted. Because V = L dI/dt, an abrupt interruption produces a very large voltage, which is why switched inductive loads need a diode, snubber or clamp.',
    category: 'fundamentals',
    page: 'inductors',
  },
  {
    term: 'Ground loop',
    definition:
      'A closed conducting path between two points nominally at ground potential, in which induced or injected current develops a voltage difference. A common source of hum and measurement error; broken with isolation rather than with more copper.',
    category: 'fundamentals',
  },
  {
    term: 'Henry',
    expansion: 'H',
    definition:
      'The SI unit of inductance. One henry produces one volt when current changes at one ampere per second.',
    category: 'fundamentals',
    page: 'inductors',
  },
  {
    term: 'Hysteresis',
    definition:
      'Dependence of a system\'s state on its history. In magnetic cores it is the lag between field and flux, and a source of loss. In a comparator or Schmitt trigger it is deliberate: separating the two thresholds prevents chattering on a slow input.',
    category: 'fundamentals',
  },
  {
    term: 'Impedance',
    expansion: 'Z',
    definition:
      'The complex ratio of voltage to current in an AC circuit, in ohms. Its real part is resistance and its imaginary part reactance. The two add as vectors, not arithmetically: 30 Ω of resistance with 40 Ω of reactance gives 50 Ω.',
    category: 'fundamentals',
    page: 'reactance-and-impedance',
    see: ['Reactance', 'Admittance'],
  },
  {
    term: 'Inductance',
    expansion: 'L',
    definition:
      'The property by which a changing current induces an opposing voltage, in henries. An inductor resists changes in current and stores energy in a magnetic field.',
    category: 'fundamentals',
    page: 'inductors',
  },
  {
    term: 'IPC-2221',
    definition:
      'The generic printed board design standard, best known for the curves relating PCB trace cross-section to current and temperature rise. Empirical, conservative, and derived from isolated traces in still air.',
    category: 'fundamentals',
    page: 'pcb-traces',
  },
  {
    term: 'Kirchhoff’s laws',
    definition:
      'Two conservation statements. The current law: currents entering a node sum to those leaving it. The voltage law: voltages around any closed loop sum to zero. Together with Ohm’s law they solve any lumped circuit.',
    category: 'fundamentals',
    page: 'kirchhoffs-laws',
  },
  {
    term: 'Loss tangent',
    expansion: 'tan δ',
    definition:
      'The ratio of a dielectric’s lossy component to its reactive one — how much energy the insulator absorbs rather than stores. About 0.02 for FR-4 and under 0.002 for PTFE laminates, which is why microwave boards use the latter.',
    category: 'fundamentals',
    page: 'microstrip',
  },
  {
    term: 'Lumped element model',
    definition:
      'The assumption that a circuit is small enough that signals appear everywhere simultaneously, so it can be described by discrete components. It fails once the circuit approaches about a tenth of a wavelength, beyond which transmission line analysis is needed.',
    category: 'fundamentals',
    page: 'transmission-lines',
  },
  {
    term: 'Ohm',
    expansion: 'Ω',
    definition:
      'The SI unit of resistance and of impedance magnitude: one volt per ampere.',
    category: 'fundamentals',
    page: 'ohms-law',
  },
  {
    term: 'Ohm’s law',
    definition:
      'Voltage equals current times resistance. The physical claim is that the ratio stays constant as voltage varies — true for metals, false for diodes, lamps and thermistors.',
    category: 'fundamentals',
    page: 'ohms-law',
  },
  {
    term: 'PEP',
    expansion: 'Peak envelope power',
    definition:
      'Power at the peak of the modulation envelope, the standard rating for SSB transmitters. Considerably higher than average power for voice, and equal to it for a continuous carrier.',
    category: 'fundamentals',
    page: 'ac-power',
  },
  {
    term: 'Permeability',
    expansion: 'µ',
    definition:
      'How readily a material carries magnetic flux. Relative permeability multiplies an inductor’s value, at the cost of saturation above a maximum flux density.',
    category: 'fundamentals',
    page: 'inductors',
    see: ['Saturation'],
  },
  {
    term: 'Permittivity',
    expansion: 'ε',
    definition:
      'How readily a material stores electric field energy. Relative permittivity εr sets capacitance and slows propagation by √εr. About 4.4 for FR-4 and 1.0 for air.',
    category: 'fundamentals',
    page: 'microstrip',
  },
  {
    term: 'Power factor',
    definition:
      'The ratio of real power to apparent power, cos φ for a sinusoidal system. A poor power factor means the supply carries current that does no work. Distorted current waveforms make the true power factor worse than cos φ alone suggests.',
    category: 'fundamentals',
    page: 'ac-power',
  },
  {
    term: 'Q factor',
    expansion: 'Quality factor',
    definition:
      'Energy stored divided by energy lost per radian, and equivalently the ratio of a resonance’s centre frequency to its −3 dB bandwidth. High Q means narrow and lightly damped; it also means a long ring-down.',
    category: 'fundamentals',
    page: 'q-factor',
    see: ['Resonance', 'Damping ratio'],
  },
  {
    term: 'Damping ratio',
    expansion: 'ζ',
    definition:
      'The control-theory counterpart of Q, with ζ = 1/(2Q). ζ = 1 is critically damped, 0.707 gives a maximally flat Butterworth response, and below 0.5 the system is overdamped and sluggish.',
    category: 'fundamentals',
    page: 'q-factor',
  },
  {
    term: 'Reactance',
    expansion: 'X',
    definition:
      'The imaginary part of impedance, in ohms. Capacitive reactance falls with frequency, inductive reactance rises. Reactance stores and returns energy rather than dissipating it.',
    category: 'fundamentals',
    page: 'reactance-and-impedance',
  },
  {
    term: 'Resistivity',
    expansion: 'ρ',
    definition:
      'A material’s intrinsic opposition to current, in ohm-metres, independent of shape. Copper is 1.72 × 10⁻⁸ Ω·m at 20 °C and rises about 0.4 % per kelvin.',
    category: 'fundamentals',
    page: 'ohms-law',
  },
  {
    term: 'Resonance',
    definition:
      'The frequency at which inductive and capacitive reactance cancel. A series circuit then shows minimum impedance, a parallel circuit maximum. Component voltages or currents can exceed the applied value by a factor of Q.',
    category: 'fundamentals',
    page: 'resonance',
  },
  {
    term: 'RMS',
    expansion: 'Root mean square',
    definition:
      'The equivalent DC value that would deliver the same power into a resistance. For a sine, peak divided by √2. Average-responding meters assume a sine and read incorrectly on any other waveform.',
    category: 'fundamentals',
    page: 'ac-fundamentals',
    see: ['Crest factor'],
  },
  {
    term: 'Saturation',
    definition:
      'The point at which a magnetic core can carry no more flux, permeability collapses toward that of air, and inductance falls abruptly. Current then rises almost unchecked, which is how switching converters fail.',
    category: 'fundamentals',
    page: 'inductors',
  },
  {
    term: 'Self-resonant frequency',
    expansion: 'SRF',
    definition:
      'The frequency at which a component’s parasitics resonate with its intended value. Above it, a capacitor behaves as an inductor and an inductor as a capacitor. The reason a large electrolytic decouples nothing at VHF.',
    category: 'fundamentals',
    page: 'resonance',
  },
  {
    term: 'Sheet resistance',
    definition:
      'The resistance of a square of conductive film, independent of the square’s size, in ohms per square. One-ounce PCB copper is about 0.5 mΩ per square, which makes trace resistance a matter of counting squares.',
    category: 'fundamentals',
    page: 'pcb-traces',
  },
  {
    term: 'Slew rate',
    definition:
      'The maximum rate at which an output can change, in volts per microsecond. An amplifier driven beyond it distorts regardless of how good its small-signal response is.',
    category: 'fundamentals',
  },
  {
    term: 'Susceptance',
    expansion: 'B',
    definition: 'The imaginary part of admittance, in siemens. The reciprocal counterpart of reactance.',
    category: 'fundamentals',
    see: ['Admittance'],
  },
  {
    term: 'Time constant',
    expansion: 'τ',
    definition:
      'For an RC network, the product RC; for RL, L/R. One time constant reaches 63.2 % of the final value, five reaches 99.3 %. Also the reciprocal of 2π times the corner frequency.',
    category: 'fundamentals',
    page: 'rc-circuits',
  },
  {
    term: 'Tolerance',
    definition:
      'The permitted deviation from a nominal value at manufacture, at a stated temperature. Not the same as accuracy in service, which also involves temperature coefficient, self-heating, ageing and voltage coefficient.',
    category: 'fundamentals',
    page: 'resistor-values',
  },
  {
    term: 'Temperature coefficient',
    expansion: 'tempco',
    definition:
      'How much a parameter drifts per kelvin, usually in ppm/K. In a divider, matched coefficients matter more than absolute tolerance, because the ratio holds if both parts drift together.',
    category: 'fundamentals',
    page: 'resistor-values',
  },
  {
    term: 'Volt',
    expansion: 'V',
    definition:
      'The SI unit of electric potential difference: one joule per coulomb. The work done moving unit charge between two points.',
    category: 'fundamentals',
    page: 'ohms-law',
  },
  {
    term: 'Voltage divider',
    definition:
      'Two series impedances producing a fraction of the applied voltage at their junction. Only a voltage source for loads much larger than the parallel combination of the two — it is not a regulator.',
    category: 'fundamentals',
    page: 'voltage-divider',
  },
  {
    term: 'Watt',
    expansion: 'W',
    definition:
      'The SI unit of power: one joule per second. In a circuit, the product of voltage and current, in phase.',
    category: 'fundamentals',
    page: 'dc-power',
  },
];
