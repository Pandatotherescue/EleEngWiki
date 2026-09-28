import type { GlossaryEntry } from './types';

export const signalTerms: GlossaryEntry[] = [
  {
    term: 'ACPR',
    expansion: 'Adjacent channel power ratio',
    definition:
      'How much of a transmitter’s power falls into the neighbouring channel, in dBc. A measure of spectral regrowth caused by amplifier non-linearity, and a common regulatory limit.',
    category: 'modulation',
  },
  {
    term: 'AM',
    expansion: 'Amplitude modulation',
    definition:
      'Varying a carrier’s amplitude with the information signal. Simple to demodulate, wasteful of power since most of it sits in the carrier, and vulnerable to amplitude noise. Still used for aeronautical voice because overlapping transmissions remain intelligible.',
    category: 'modulation',
  },
  {
    term: 'Bandwidth',
    definition:
      'The span of frequencies a signal occupies or a system passes. For a filter it is usually the −3 dB width. Shannon ties it directly to capacity: more bandwidth or more SNR, and nothing else.',
    category: 'modulation',
    page: 'filters',
  },
  {
    term: 'Baud',
    definition:
      'Symbols per second, not bits per second. A modulation carrying four bits per symbol runs at four times the bit rate of its baud rate — the two are equal only for binary schemes.',
    category: 'modulation',
  },
  {
    term: 'BER',
    expansion: 'Bit error ratio',
    definition:
      'The fraction of received bits in error. The usual end measure of link quality, and the thing forward error correction exists to improve at a given SNR.',
    category: 'modulation',
  },
  {
    term: 'Carrier',
    definition:
      'The steady sinusoid that modulation varies in order to carry information. Its frequency determines propagation behaviour; the modulation determines the information.',
    category: 'modulation',
  },
  {
    term: 'CDMA',
    expansion: 'Code division multiple access',
    definition:
      'Users share the same frequency and time, separated by orthogonal spreading codes. Every other user appears as noise, so capacity degrades gradually with load rather than hitting a hard limit.',
    category: 'systems',
  },
  {
    term: 'Constellation',
    definition:
      'The plot of a digital modulation’s symbol positions in amplitude and phase. Noise scatters the received points around their ideal positions, and how far they scatter is the error vector magnitude.',
    category: 'modulation',
    see: ['EVM', 'QAM'],
  },
  {
    term: 'CTCSS',
    expansion: 'Continuous tone-coded squelch system',
    definition:
      'A sub-audible tone transmitted with speech so a receiver opens only for its own group. It does not prevent others from hearing the transmission, and does not stop interference — it only avoids hearing it.',
    category: 'operations',
    see: ['DCS', 'Squelch'],
  },
  {
    term: 'DCS',
    expansion: 'Digital-coded squelch',
    definition:
      'The digital equivalent of CTCSS, using a continuous low-rate code word rather than a tone. More codes available, and less prone to false opening.',
    category: 'operations',
  },
  {
    term: 'Deviation',
    definition:
      'The peak frequency shift of an FM carrier from its unmodulated value. With the modulating frequency it sets occupied bandwidth via Carson’s rule. Narrowband FM uses about 2.5 kHz, broadcast FM 75 kHz.',
    category: 'modulation',
  },
  {
    term: 'DSSS',
    expansion: 'Direct-sequence spread spectrum',
    definition:
      'Multiplying the signal by a much faster pseudo-random code, spreading it over a wide band. This lowers power spectral density, adds processing gain against narrowband interference, and lets several users share a band.',
    category: 'modulation',
    see: ['FHSS', 'Processing gain'],
  },
  {
    term: 'Duty cycle',
    definition:
      'The fraction of time a transmitter is active. Many sub-GHz allocations limit it independently of power, so a device can be within its power limit and still fail on airtime.',
    category: 'operations',
    page: 'eirp-and-erp',
  },
  {
    term: 'EVM',
    expansion: 'Error vector magnitude',
    definition:
      'The RMS distance between received symbols and their ideal constellation positions, as a percentage or in dB. A single figure capturing noise, distortion and phase noise together.',
    category: 'modulation',
  },
  {
    term: 'FEC',
    expansion: 'Forward error correction',
    definition:
      'Adding structured redundancy so the receiver can correct errors without a retransmission. It is where most of the sensitivity improvement of the last few decades has come from, by lowering the SNR a link needs.',
    category: 'modulation',
  },
  {
    term: 'FHSS',
    expansion: 'Frequency-hopping spread spectrum',
    definition:
      'Changing carrier frequency rapidly in a pattern known to both ends. Gives resistance to narrowband jamming and interference, and averages fading across the band.',
    category: 'modulation',
  },
  {
    term: 'FM',
    expansion: 'Frequency modulation',
    definition:
      'Varying the carrier frequency with the information signal. Amplitude carries no information, so limiting removes amplitude noise — hence its capture effect, where the stronger of two signals suppresses the weaker entirely.',
    category: 'modulation',
  },
  {
    term: 'GMSK',
    expansion: 'Gaussian minimum shift keying',
    definition:
      'A constant-envelope phase modulation with a Gaussian pre-filter, giving compact spectrum and allowing efficient saturated amplifiers. Used by GSM and by AIS.',
    category: 'modulation',
  },
  {
    term: 'IF',
    expansion: 'Intermediate frequency',
    definition:
      'A fixed frequency to which incoming signals are converted in a superheterodyne receiver, so that filtering and gain happen at one frequency regardless of what is being received.',
    category: 'systems',
    see: ['Superheterodyne', 'Image frequency'],
  },
  {
    term: 'Image frequency',
    definition:
      'The unwanted input frequency that converts to the same IF as the wanted one, offset by twice the IF. Rejecting it is the central design problem of a superheterodyne receiver, and the reason direct-sampling architectures are attractive.',
    category: 'systems',
    page: 'land-mobile-radio',
  },
  {
    term: 'IP3',
    expansion: 'Third-order intercept point',
    definition:
      'The extrapolated level where third-order intermodulation products would equal the wanted signal. A figure of merit for linearity: higher means a receiver tolerates strong nearby signals better.',
    category: 'rf',
    see: ['Intermodulation'],
  },
  {
    term: 'Intermodulation',
    expansion: 'IMD',
    definition:
      'Unwanted products created when two or more signals mix in a non-linear stage. Third-order products fall close to the originals, which is why they are troublesome — filtering cannot remove them.',
    category: 'rf',
  },
  {
    term: 'LO',
    expansion: 'Local oscillator',
    definition:
      'The oscillator that mixes with an incoming signal to shift it to another frequency. Its phase noise and stability transfer directly onto the converted signal.',
    category: 'systems',
  },
  {
    term: 'Mixer',
    definition:
      'A deliberately non-linear device multiplying two signals to produce their sum and difference frequencies. The basis of frequency conversion in every superheterodyne transmitter and receiver.',
    category: 'systems',
  },
  {
    term: 'OFDM',
    expansion: 'Orthogonal frequency-division multiplexing',
    definition:
      'Splitting data across many narrow, orthogonal subcarriers. Each sees flat fading rather than frequency-selective fading, which makes equalisation tractable. Used by Wi-Fi, LTE, DAB and DVB-T.',
    category: 'modulation',
  },
  {
    term: 'PM',
    expansion: 'Phase modulation',
    definition:
      'Varying carrier phase with the information signal. Closely related to FM — the two differ by an integration of the modulating signal — and the basis of all digital phase-shift keying.',
    category: 'modulation',
  },
  {
    term: 'Processing gain',
    definition:
      'The SNR improvement a spread-spectrum receiver obtains by despreading, equal to the ratio of spread bandwidth to information bandwidth. What lets a signal be recovered from below the noise floor.',
    category: 'modulation',
  },
  {
    term: 'PSK',
    expansion: 'Phase-shift keying',
    definition:
      'Encoding data in carrier phase. BPSK carries one bit per symbol and is very robust; QPSK two; higher orders trade robustness for rate.',
    category: 'modulation',
  },
  {
    term: 'QAM',
    expansion: 'Quadrature amplitude modulation',
    definition:
      'Encoding data in both amplitude and phase. 16-QAM carries four bits per symbol, 256-QAM eight. Each step up needs roughly 6 dB more SNR, which is why links drop to lower orders as conditions degrade.',
    category: 'modulation',
  },
  {
    term: 'Selectivity',
    definition:
      'A receiver’s ability to reject signals on adjacent channels. Set by filter shape rather than by gain, and in a direct-sampling receiver by the converter’s dynamic range instead.',
    category: 'systems',
  },
  {
    term: 'Sensitivity',
    definition:
      'The smallest signal a receiver can usefully detect, −174 dBm/Hz plus 10 log(bandwidth) plus noise figure plus the required SNR. Improved by narrowing bandwidth, lowering noise figure or using better coding.',
    category: 'systems',
    page: 'noise-figure',
  },
  {
    term: 'Sideband',
    definition:
      'The bands either side of a carrier produced by modulation. AM transmits both plus the carrier; SSB transmits one sideband only, saving both power and bandwidth.',
    category: 'modulation',
  },
  {
    term: 'SNR',
    expansion: 'Signal-to-noise ratio',
    definition:
      'Wanted signal power divided by noise power, in dB. What a demodulator actually needs; every part of a link budget exists to deliver enough of it.',
    category: 'modulation',
    page: 'link-budget',
  },
  {
    term: 'Spurious emission',
    definition:
      'Any transmitted output outside the intended channel that is not a necessary product of modulation — harmonics, mixer products, oscillator leakage. Tightly limited by regulation.',
    category: 'operations',
  },
  {
    term: 'Squelch',
    definition:
      'A circuit muting the receiver until a signal exceeds a threshold, so an operator is not left listening to noise. Can be triggered by signal level, by noise level, or by a tone such as CTCSS.',
    category: 'operations',
  },
  {
    term: 'SSB',
    expansion: 'Single sideband',
    definition:
      'AM with the carrier and one sideband suppressed. About a third of the bandwidth and far better power efficiency than full AM, at the cost of needing an accurate reference to demodulate. The standard mode for HF voice.',
    category: 'modulation',
    see: ['USB / LSB'],
  },
  {
    term: 'USB / LSB',
    expansion: 'Upper and lower sideband',
    definition:
      'Which sideband an SSB signal retains. Convention is LSB below 10 MHz and USB above, with marine and aeronautical services using USB throughout. Choosing the wrong one makes speech unintelligible.',
    category: 'modulation',
  },
  {
    term: 'Superheterodyne',
    definition:
      'The dominant receiver architecture for a century: convert the incoming signal to a fixed intermediate frequency, then filter and amplify there. Simplifies filtering enormously but introduces the image frequency problem.',
    category: 'systems',
  },
  {
    term: 'Symbol rate',
    definition:
      'How many modulation states are transmitted per second, in baud. Multiplied by bits per symbol it gives the bit rate.',
    category: 'modulation',
  },
  {
    term: 'THD',
    expansion: 'Total harmonic distortion',
    definition:
      'The ratio of harmonic content to the fundamental, as a percentage. In power systems, harmonic current is what makes the true power factor worse than cos φ alone implies.',
    category: 'modulation',
    page: 'ac-power',
  },
];
