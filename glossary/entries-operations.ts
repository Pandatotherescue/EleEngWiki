import type { GlossaryEntry } from './types';

export const operationsTerms: GlossaryEntry[] = [
  {
    term: 'AIS',
    expansion: 'Automatic identification system',
    definition:
      'A VHF data system by which vessels broadcast identity, position, course and speed. Class A is mandatory on SOLAS ships and transmits at 12.5 W using reserved time slots; Class B is for leisure craft at 2 W or 5 W and yields to Class A.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'AIS-SART',
    definition:
      'A search and rescue transmitter broadcasting an AIS position, which appears on any AIS display within VHF range. The modern replacement for the radar SART.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'AN/PRC',
    definition:
      'US military nomenclature under the Joint Electronics Type Designation System: A-N for Army-Navy, P for portable, R for radio, C for two-way voice. It encodes platform and function, and says nothing about frequency or power.',
    category: 'operations',
    page: 'radio-manufacturers',
  },
  {
    term: 'BGAN',
    expansion: 'Broadband Global Area Network',
    definition:
      'Inmarsat’s land-mobile satellite data service, used through portable terminals that are pointed once at a geostationary satellite. Common with broadcasters and aid organisations.',
    category: 'operations',
    page: 'cobham-satcom',
  },
  {
    term: 'Callsign',
    definition:
      'The identifier assigned to a station by its national administration, under an ITU-allocated prefix block. Required identification for most licensed services.',
    category: 'operations',
  },
  {
    term: 'Cospas-Sarsat',
    definition:
      'The international satellite system that detects 406 MHz distress beacons and routes alerts to rescue coordination centres. The reason an EPIRB works anywhere on earth without a subscription.',
    category: 'operations',
    page: 'marine-manufacturers',
  },
  {
    term: 'Direct mode',
    expansion: 'DMO',
    definition:
      'Radio-to-radio operation without infrastructure, on a trunked or repeater-based system. The fallback when the network is unreachable — inside a building, underground, or after infrastructure failure.',
    category: 'operations',
    page: 'land-mobile-radio',
  },
  {
    term: 'DMR',
    expansion: 'Digital Mobile Radio',
    definition:
      'An open ETSI standard using two-slot TDMA to carry two calls in one 12.5 kHz channel. The pragmatic middle of professional mobile radio — cheap enough for a haulage yard, capable enough for a small city.',
    category: 'operations',
    page: 'land-mobile-radio',
  },
  {
    term: 'DSC',
    expansion: 'Digital Selective Calling',
    definition:
      'A digital calling system carrying identity and position, on VHF channel 70 and dedicated MF/HF frequencies. What distinguishes a GMDSS radio from a recreational one. Useless without a programmed MMSI and a position feed.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'Duplex',
    definition:
      'Simultaneous transmission in both directions, using separate frequencies. Half-duplex alternates with a push-to-talk; simplex uses one frequency in both directions and is therefore always half-duplex.',
    category: 'operations',
  },
  {
    term: 'EPIRB',
    expansion: 'Emergency position-indicating radio beacon',
    definition:
      'A 406 MHz distress beacon for vessels, with a 121.5 MHz homing signal. Float-free versions release and activate by hydrostatic pressure if the vessel sinks, requiring no action from the crew.',
    category: 'operations',
    page: 'marine-manufacturers',
  },
  {
    term: 'ETSI',
    expansion: 'European Telecommunications Standards Institute',
    definition:
      'The body behind TETRA, DMR, dPMR and the European short-range device standards, among much else.',
    category: 'operations',
  },
  {
    term: 'GMDSS',
    expansion: 'Global Maritime Distress and Safety System',
    definition:
      'The international framework defining what distress and safety equipment a vessel must carry, according to the sea areas it operates in. It is why a commercial marine radio catalogue reads as a compliance list.',
    category: 'operations',
    page: 'furuno-marine',
    see: ['Sea areas'],
  },
  {
    term: 'HAVE QUICK',
    definition:
      'A NATO frequency-hopping scheme for UHF air-ground voice, standardised as STANAG 4372. SATURN is its faster successor. Which one a radio supports is often what distinguishes otherwise identical models.',
    category: 'operations',
    page: 'rohde-schwarz',
  },
  {
    term: 'IEC 60945',
    definition:
      'The environmental and EMC standard for maritime navigation and radio equipment — vibration, salt mist, temperature, supply variation. Every part of a GMDSS chain must meet it, power supplies included.',
    category: 'operations',
    page: 'lars-thrane',
  },
  {
    term: 'Inmarsat',
    definition:
      'The geostationary satellite operator behind Inmarsat-C, FleetBroadband and Fleet Xpress. Its coverage extends to roughly 76° north and south, leaving the polar regions to Iridium or HF.',
    category: 'operations',
    page: 'cobham-satcom',
  },
  {
    term: 'Iridium',
    definition:
      'A constellation of 66 low-earth-orbit satellites giving genuine pole-to-pole coverage. Approved for GMDSS in 2018 and in service from 2020, ending Inmarsat’s monopoly on satellite distress alerting.',
    category: 'operations',
    page: 'lars-thrane',
  },
  {
    term: 'ITAR',
    expansion: 'International Traffic in Arms Regulations',
    definition:
      'The US export control regime covering defence articles, including most tactical radio equipment and its cryptography. Often the practical determinant of whether a given radio variant is available to a given buyer.',
    category: 'operations',
    page: 'radio-manufacturers',
  },
  {
    term: 'ITU',
    expansion: 'International Telecommunication Union',
    definition:
      'The UN agency allocating spectrum internationally, assigning callsign prefixes and maintaining the Radio Regulations. National regulators work within its allocations.',
    category: 'operations',
  },
  {
    term: 'LRIT',
    expansion: 'Long Range Identification and Tracking',
    definition:
      'A mandatory position-reporting system for SOLAS vessels, carried over satellite. Distinct from AIS, which is broadcast and local.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'MANET',
    expansion: 'Mobile ad hoc network',
    definition:
      'A self-forming, self-healing radio network in which every node routes for the others. No infrastructure and no fixed topology, which is why it suits dismounted tactical use.',
    category: 'systems',
    page: 'thales',
  },
  {
    term: 'MMSI',
    expansion: 'Maritime Mobile Service Identity',
    definition:
      'A nine-digit identifier for a vessel or coast station, used by DSC and AIS. Many radios allow it to be entered only once without a dealer reset.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'MUOS',
    expansion: 'Mobile User Objective System',
    definition:
      'The US narrowband military satellite system providing beyond-line-of-sight voice and data to tactical radios. Supported by current-generation manpacks and handhelds.',
    category: 'operations',
    page: 'l3harris',
  },
  {
    term: 'NAVTEX',
    definition:
      'A narrow-band direct-printing service broadcasting navigational warnings, weather and search-and-rescue information on 518 kHz, with 490 kHz for national languages. Deliberately low-rate and low-frequency, for reliable ground-wave coverage.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'NVIS',
    expansion: 'Near vertical incidence skywave',
    definition:
      'An HF technique using high-angle radiation reflected almost straight down from the ionosphere, giving coverage from a few kilometres out to a few hundred with no skip zone. Used where terrain blocks line of sight.',
    category: 'operations',
  },
  {
    term: 'P25',
    expansion: 'Project 25',
    definition:
      'The digital standard for US public safety radio, developed by APCO. Solves the same problem as TETRA with a different architecture, and the two do not interoperate.',
    category: 'operations',
    page: 'land-mobile-radio',
  },
  {
    term: 'PLB',
    expansion: 'Personal locator beacon',
    definition:
      'A 406 MHz distress beacon carried by a person rather than fitted to a vessel. Registered to an individual, activated manually, and not a substitute for an EPIRB on a regulated vessel.',
    category: 'operations',
    page: 'marine-manufacturers',
  },
  {
    term: 'PTT',
    expansion: 'Push to talk',
    definition:
      'The control that keys a transmitter. Its presence defines half-duplex operation and, with it, the discipline of taking turns that shapes radio procedure.',
    category: 'operations',
  },
  {
    term: 'Q codes',
    definition:
      'Three-letter codes beginning with Q, originally for Morse brevity and still used in amateur and aeronautical practice. QTH is location, QRM interference, QSY change frequency.',
    category: 'operations',
  },
  {
    term: 'Repeater',
    definition:
      'A station receiving on one frequency and simultaneously retransmitting on another, extending the range of low-power mobiles by sitting somewhere high. The offset between the two frequencies is the repeater shift.',
    category: 'operations',
  },
  {
    term: 'SART',
    expansion: 'Search and rescue transponder',
    definition:
      'A device that responds to a 9 GHz radar interrogation with a distinctive pattern of blips on the radar screen. Increasingly superseded by the AIS-SART.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'SATURN',
    definition:
      'The faster successor to HAVE QUICK for NATO UHF air-ground communication, with improved hopping and resistance to jamming.',
    category: 'operations',
    page: 'rohde-schwarz',
  },
  {
    term: 'Sea areas',
    definition:
      'The GMDSS division of the world’s waters by available infrastructure. A1 is within shore VHF DSC range, A2 within shore MF, A3 within geostationary satellite coverage, A4 everything else. A vessel’s area determines its required equipment.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'Selcall',
    expansion: 'Selective calling',
    definition:
      'Calling an individual station or group by transmitting its identifier, so other receivers stay silent. The HF and land-mobile ancestor of DSC.',
    category: 'operations',
  },
  {
    term: 'SOLAS',
    expansion: 'Safety of Life at Sea',
    definition:
      'The IMO convention setting minimum safety standards for merchant ships, including the communications equipment that makes up GMDSS. Whether a vessel is SOLAS-regulated determines which market its equipment comes from.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'SSAS',
    expansion: 'Ship Security Alert System',
    definition:
      'A covert alarm required on SOLAS vessels since 2004, sending an alert ashore without any local indication. Usually carried on the same satellite terminal as other traffic.',
    category: 'operations',
    page: 'furuno-marine',
  },
  {
    term: 'STANAG',
    expansion: 'Standardisation Agreement',
    definition:
      'A NATO agreement defining a common procedure or technical standard. In radio, STANAG numbers identify waveforms and data links — 4285 and 5066 for HF data, 5511 for Link 11, 4372 for HAVE QUICK.',
    category: 'operations',
    page: 'rohde-schwarz',
  },
  {
    term: 'TDMA',
    expansion: 'Time division multiple access',
    definition:
      'Users share a frequency by transmitting in assigned time slots. Used by DMR, TETRA, GSM and Class A AIS. Gives deterministic access, unlike contention-based schemes.',
    category: 'systems',
    page: 'land-mobile-radio',
  },
  {
    term: 'TETRA',
    expansion: 'Terrestrial Trunked Radio',
    definition:
      'The European trunked standard for emergency services and utilities, with encryption, group calling and direct-mode fallback. Built for guaranteed access under load rather than for throughput.',
    category: 'operations',
    page: 'land-mobile-radio',
  },
  {
    term: 'Trunking',
    definition:
      'Assigning a channel from a shared pool for the duration of each call, so many talkgroups share few channels. The same statistical multiplexing argument that underlies packet switching.',
    category: 'operations',
    page: 'land-mobile-radio',
  },
  {
    term: 'Type approval',
    definition:
      'Certification that a product meets a standard for its intended service. The main reason commercial marine equipment costs several times its leisure equivalent for similar RF performance.',
    category: 'operations',
    page: 'marine-manufacturers',
  },
  {
    term: 'Waveform',
    definition:
      'In tactical radio, the complete definition of how a radio transmits and receives — modulation, coding, hopping, networking and security. Two radios cannot interoperate unless they share one, which makes buying a radio partly a matter of choosing which club to join.',
    category: 'systems',
    page: 'tactical-manufacturers',
  },
];
