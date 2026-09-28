import type { GlossaryEntry } from './types';

export const rfTerms: GlossaryEntry[] = [
  {
    term: 'ALE',
    expansion: 'Automatic Link Establishment',
    definition:
      'An HF technique in which radios sound the band, exchange short probes and select a working frequency automatically. It turned HF from a skilled-operator technology into something that can be handed to a non-specialist.',
    category: 'rf',
    page: 'tactical-manufacturers',
  },
  {
    term: 'Aperture',
    definition:
      'The effective collecting area of a receiving antenna, Ae = Gλ²/4π. For a fixed gain it shrinks with frequency, which is the real origin of the frequency term in free-space path loss.',
    category: 'rf',
    page: 'antenna-gain',
  },
  {
    term: 'Balun',
    expansion: 'Balanced to unbalanced',
    definition:
      'A device connecting a balanced load, such as a dipole, to an unbalanced feed such as coax. Without one, current flows on the outside of the coax shield and the feedline radiates and picks up noise.',
    category: 'rf',
    page: 'antenna-fundamentals',
  },
  {
    term: 'Beamwidth',
    definition:
      'The angular width of an antenna’s main lobe between its −3 dB points. Inversely related to gain: roughly 70λ/D degrees for an aperture of diameter D. High gain means tight pointing tolerance.',
    category: 'rf',
    page: 'antenna-gain',
  },
  {
    term: 'Characteristic impedance',
    expansion: 'Z₀',
    definition:
      'The ratio of voltage to current for a wave travelling along a transmission line, √(L/C) for a low-loss line. Not a resistance you can measure with a meter. A line terminated in Z₀ produces no reflection.',
    category: 'rf',
    page: 'transmission-lines',
  },
  {
    term: 'Cut-off frequency (waveguide)',
    definition:
      'The frequency below which a waveguide mode cannot propagate at all; the field decays exponentially instead. For the dominant TE₁₀ mode it is c/2a, set by the broad wall alone.',
    category: 'rf',
    page: 'waveguide',
  },
  {
    term: 'dB',
    expansion: 'Decibel',
    definition:
      'A logarithmic ratio: 10 log₁₀ of a power ratio, or 20 log₁₀ of a voltage ratio across the same impedance. Always a ratio between two quantities — a suffix is needed to make it absolute.',
    category: 'rf',
    page: 'decibels',
    see: ['dBm', 'dBi'],
  },
  {
    term: 'dBc',
    definition:
      'Level relative to the carrier. Used for spurious emissions, harmonics and phase noise, where what matters is how far below the wanted signal an unwanted product sits.',
    category: 'rf',
    page: 'decibels',
  },
  {
    term: 'dBi',
    definition:
      'Antenna gain referenced to an isotropic radiator. The usual convention in modern specifications and regulation.',
    category: 'rf',
    page: 'antenna-gain',
    see: ['dBd'],
  },
  {
    term: 'dBd',
    definition:
      'Antenna gain referenced to a half-wave dipole. dBi = dBd + 2.15. A gain figure quoted without a suffix is ambiguous and usually means whichever is more flattering.',
    category: 'rf',
    page: 'antenna-gain',
  },
  {
    term: 'dBm',
    definition:
      'Absolute power referenced to one milliwatt. 0 dBm is 1 mW; +30 dBm is 1 W. In a 50 Ω system 0 dBm corresponds to 223 mV RMS.',
    category: 'rf',
    page: 'decibels',
  },
  {
    term: 'Directivity',
    definition:
      'How strongly an antenna concentrates radiation in its favoured direction, independent of losses. Gain is directivity multiplied by efficiency.',
    category: 'rf',
    page: 'antenna-gain',
  },
  {
    term: 'Dispersion',
    definition:
      'Variation of propagation velocity with frequency, so that a wideband signal spreads as it travels. Pronounced in waveguide near cut-off, and present in any dielectric whose permittivity varies with frequency.',
    category: 'rf',
    page: 'waveguide',
  },
  {
    term: 'EIRP',
    expansion: 'Equivalent isotropically radiated power',
    definition:
      'Transmit power minus feedline loss plus antenna gain — the power an isotropic radiator would need to produce the same field strength in the main beam. The quantity most regulations cap.',
    category: 'rf',
    page: 'eirp-and-erp',
    see: ['ERP'],
  },
  {
    term: 'ERP',
    expansion: 'Effective radiated power',
    definition:
      'The same idea as EIRP but referenced to a half-wave dipole, so ERP = EIRP − 2.15 dB. Common in broadcast regulation.',
    category: 'rf',
    page: 'eirp-and-erp',
  },
  {
    term: 'Far field',
    definition:
      'The region beyond about 2D²/λ where an antenna’s radiation pattern has formed and gain figures apply. Closer in, measurements will not match the specification.',
    category: 'rf',
    page: 'antenna-gain',
  },
  {
    term: 'Fresnel zone',
    definition:
      'The ellipsoidal region around a radio path through which energy effectively propagates. Keeping 60 % of the first zone clear gives approximately free-space loss; merely having line of sight does not.',
    category: 'rf',
    page: 'fresnel-zones',
  },
  {
    term: 'FSPL',
    expansion: 'Free-space path loss',
    definition:
      'Loss between two isotropic antennas in free space. Doubling either distance or frequency adds 6 dB. A best case — real paths are always worse.',
    category: 'rf',
    page: 'path-loss',
  },
  {
    term: 'Gamma',
    expansion: 'Γ, reflection coefficient',
    definition:
      'The complex ratio of reflected to incident wave, (Z_L − Z₀)/(Z_L + Z₀). Zero for a matched load, +1 for an open circuit, −1 for a short.',
    category: 'rf',
    page: 'vswr-and-return-loss',
  },
  {
    term: 'Group delay',
    definition:
      'The delay experienced by the envelope of a modulated signal, the derivative of phase with respect to frequency. Variation across a band distorts pulses even when the amplitude response is flat.',
    category: 'rf',
    page: 'filters',
  },
  {
    term: 'Guide wavelength',
    expansion: 'λg',
    definition:
      'The wavelength along a waveguide, always longer than in free space and tending to infinity at cut-off. Any dimension specified in wavelengths inside a guide uses λg, not λ₀.',
    category: 'rf',
    page: 'waveguide',
  },
  {
    term: 'HCLOS',
    expansion: 'High capacity line of sight',
    definition:
      'A point-to-point microwave radio carrying an IP backbone between fixed or semi-fixed sites. Closer in role to a commercial microwave hop than to a combat net radio.',
    category: 'rf',
    page: 'l3harris',
  },
  {
    term: 'Insertion loss',
    definition:
      'The power lost by inserting a component into an otherwise matched path, in dB. Distinct from mismatch loss, which is caused by reflection rather than dissipation.',
    category: 'rf',
    page: 'attenuators',
  },
  {
    term: 'Isotropic radiator',
    definition:
      'A theoretical point source radiating equally in all directions. It cannot be built, but it is a clean reference for antenna gain and the basis of the dBi scale.',
    category: 'rf',
    page: 'antenna-gain',
  },
  {
    term: 'L-network',
    definition:
      'A two-element matching network, one series and one shunt reactance. It matches any two real resistances, but its Q — and therefore its bandwidth — is fixed by the resistance ratio and cannot be chosen.',
    category: 'rf',
    page: 'impedance-matching',
  },
  {
    term: 'LNA',
    expansion: 'Low-noise amplifier',
    definition:
      'The first amplifier in a receive chain, designed for minimum noise figure rather than maximum gain. Because the Friis cascade divides every later stage’s noise by the gain ahead of it, this stage dominates system sensitivity.',
    category: 'rf',
    page: 'noise-figure',
  },
  {
    term: 'Microstrip',
    definition:
      'A printed transmission line: a trace on an outer layer above a ground plane. Its field is partly in the board and partly in air, giving an effective permittivity between 1 and εr.',
    category: 'rf',
    page: 'microstrip',
    see: ['Stripline'],
  },
  {
    term: 'Mismatch loss',
    definition:
      'Power not accepted by a load because it is reflected, −10 log₁₀(1 − |Γ|²). A 2:1 VSWR costs only 0.5 dB, which is why mismatch usually matters for transmitter protection rather than for lost power.',
    category: 'rf',
    page: 'vswr-and-return-loss',
  },
  {
    term: 'Noise figure',
    expansion: 'NF',
    definition:
      'How much a device degrades signal-to-noise ratio, in dB, referenced to 290 K. A passive loss has a noise figure equal to its loss, which is why feedline before the first amplifier is so costly on receive.',
    category: 'rf',
    page: 'noise-figure',
    see: ['Noise temperature', 'Friis formula'],
  },
  {
    term: 'Noise floor',
    definition:
      'The thermal noise power in a given bandwidth, −174 dBm/Hz at 290 K, plus the system noise figure. Halving the bandwidth improves it by 3 dB.',
    category: 'rf',
    page: 'noise-figure',
  },
  {
    term: 'Noise temperature',
    expansion: 'Te',
    definition:
      'Noise expressed as an equivalent source temperature, Te = 290(F − 1). Preferred in satellite and radio astronomy work because it adds linearly with antenna noise temperature and resolves small differences better than dB.',
    category: 'rf',
    page: 'noise-figure',
  },
  {
    term: 'Friis formula',
    definition:
      'The cascade relation F = F₁ + (F₂−1)/G₁ + (F₃−1)/G₁G₂ + … Each stage’s noise contribution is divided by the gain preceding it, which is why the low-noise amplifier goes first.',
    category: 'rf',
    page: 'noise-figure',
  },
  {
    term: 'P1dB',
    expansion: '1 dB compression point',
    definition:
      'The input or output level at which an amplifier’s gain has fallen 1 dB below its small-signal value — a practical marker for the onset of saturation.',
    category: 'rf',
  },
  {
    term: 'Phase noise',
    definition:
      'Short-term random fluctuation in an oscillator’s phase, quoted in dBc/Hz at an offset from the carrier. It limits how closely two signals can be separated and sets the error floor in digital modulation. High resonator Q improves it.',
    category: 'rf',
    page: 'q-factor',
  },
  {
    term: 'Polarisation',
    definition:
      'The orientation of the radiated electric field. Cross-polarised linear antennas lose 20 dB or more; circular to linear costs a fixed 3 dB, which is why satellites use circular polarisation.',
    category: 'rf',
    page: 'antenna-fundamentals',
  },
  {
    term: 'Proximity effect',
    definition:
      'Current crowding in a conductor caused by the magnetic field of a neighbouring conductor. Compounds skin effect in tightly wound coils, and often dominates high-frequency winding loss.',
    category: 'rf',
    page: 'skin-effect',
  },
  {
    term: 'Radiation resistance',
    definition:
      'The fictitious resistance in which an antenna’s radiated power can be considered dissipated. Efficiency is radiation resistance divided by the sum of radiation and loss resistance — the reason very short antennas are inefficient.',
    category: 'rf',
    page: 'antenna-fundamentals',
  },
  {
    term: 'Return loss',
    definition:
      'Reflected power expressed in dB below incident, −20 log₁₀|Γ|, quoted as a positive number. 14 dB corresponds to a VSWR of about 1.5:1.',
    category: 'rf',
    page: 'vswr-and-return-loss',
  },
  {
    term: 'S-parameters',
    expansion: 'Scattering parameters',
    definition:
      'A description of a network in terms of incident and reflected waves. S11 is input reflection, S21 forward transmission, S12 reverse isolation, S22 output reflection. Used at RF because they need matched terminations rather than opens and shorts.',
    category: 'rf',
    page: 'vswr-and-return-loss',
  },
  {
    term: 'Skin depth',
    expansion: 'δ',
    definition:
      'The depth at which current density falls to 1/e of its surface value, √(ρ/πfµ). About 21 µm in copper at 10 MHz. It falls as 1/√f, so adding conductor thickness stops helping.',
    category: 'rf',
    page: 'skin-effect',
  },
  {
    term: 'Smith chart',
    definition:
      'A plot of complex reflection coefficient with contours of constant resistance and reactance. Movement along a line rotates about the centre; a full rotation is half a wavelength. Still the clearest way to see how impedance varies with frequency.',
    category: 'rf',
    page: 'smith-chart',
  },
  {
    term: 'Stripline',
    definition:
      'A printed transmission line buried between two ground planes. Its field is entirely in the dielectric, so it radiates less and propagates more slowly than microstrip, at the cost of being harder to route and impossible to probe.',
    category: 'rf',
    page: 'microstrip',
  },
  {
    term: 'Stub',
    definition:
      'A short length of transmission line used as a reactive element. A quarter-wave shorted stub appears as an open circuit, an open stub as a short. Cheap in microstrip, and inherently narrowband.',
    category: 'rf',
    page: 'transmission-lines',
  },
  {
    term: 'TEM mode',
    expansion: 'Transverse electromagnetic',
    definition:
      'A propagation mode with both fields perpendicular to the direction of travel and no cut-off frequency. Coax and two-wire lines carry it; hollow waveguide cannot.',
    category: 'rf',
    page: 'coaxial-cable',
  },
  {
    term: 'VNA',
    expansion: 'Vector network analyser',
    definition:
      'An instrument measuring the magnitude and phase of a network’s S-parameters. The phase information is what makes a mismatch diagnosable rather than merely detectable.',
    category: 'rf',
    page: 'smith-chart',
  },
  {
    term: 'VSWR',
    expansion: 'Voltage standing wave ratio',
    definition:
      'The ratio of maxima to minima in the standing wave on a mismatched line. 2:1 loses only 0.5 dB; it matters mainly for transmitter protection, voltage stress and as a diagnostic.',
    category: 'rf',
    page: 'vswr-and-return-loss',
  },
  {
    term: 'Velocity factor',
    expansion: 'vf',
    definition:
      'Propagation velocity as a fraction of the speed of light, 1/√εr for a uniform dielectric. About 0.66 for solid-polyethylene coax — which is why a quarter-wave stub is two-thirds the free-space length.',
    category: 'rf',
    page: 'wavelength-and-frequency',
  },
  {
    term: 'Wavelength',
    expansion: 'λ',
    definition:
      'Propagation velocity divided by frequency. The unit that matters for hardware, because every structure behaves according to its size relative to λ. In free space, roughly 300/f in MHz gives metres.',
    category: 'rf',
    page: 'wavelength-and-frequency',
  },
];
