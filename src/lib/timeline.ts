// De tijdlijn achter de video's-pagina.
//
// Alle video's van het kanaal staan op de tijdlijn, maar niet elke video is een
// mijlpaal. De lijst hieronder markeert de momenten die het project echt verder
// brachten en geeft ze een eigen titel ("Eerste autonome meters") plus een korte
// uitleg — bewust iets anders dan de YouTube-titel, want die beschrijft de video
// en niet het moment. Alle overige video's komen als compacte regel op de lijn.
//
// Bewust een handmatige lijst: automatisch afleiden zou elke upload tot mijlpaal
// maken, en dat is precies het onderscheid dat deze pagina wil laten zien.

import * as m from '$lib/paraglide/messages.js';
import type { Video } from '$lib/youtube';

export type Phase = 'build' | 'drive' | 'vision' | 'autonomy' | 'work';

export type Milestone = {
  /** Stabiele sleutel; komt terug in de message-keys en in het anker in de URL. */
  key: string;
  videoId: string;
  phase: Phase;
  title: () => string;
  body: () => string;
  /**
   * Alleen nodig als de upload-volgorde niet klopt met de projectvolgorde.
   * De getoonde datum blijft die van de video; dit stuurt enkel de sortering.
   */
  sortDate?: string;
};

export const phaseLabels: Record<Phase, () => string> = {
  build: m.timeline_phase_build,
  drive: m.timeline_phase_drive,
  vision: m.timeline_phase_vision,
  autonomy: m.timeline_phase_autonomy,
  work: m.timeline_phase_work
};

// Oud → nieuw, zoals het project zich ontwikkelde.
const milestones: Milestone[] = [
  {
    key: 'hubmotor',
    videoId: '-V4j899cQSQ',
    phase: 'drive',
    title: m.timeline_hubmotor_title,
    body: m.timeline_hubmotor_body
  },
  {
    key: 'arduino',
    videoId: '25qza_783X0',
    phase: 'drive',
    title: m.timeline_arduino_title,
    body: m.timeline_arduino_body
  },
  {
    key: 'twowheels',
    videoId: '92rKA-VhyYI',
    phase: 'drive',
    // Stap 3 is eerder op de dag geüpload dan stap 1 en 2, maar hoort erna.
    sortDate: '2026-04-10T13:39:00.000Z',
    title: m.timeline_twowheels_title,
    body: m.timeline_twowheels_body
  },
  {
    key: 'rover',
    videoId: 'T-b-nBbgHxI',
    phase: 'drive',
    title: m.timeline_rover_title,
    body: m.timeline_rover_body
  },
  {
    key: 'remote',
    videoId: '8m6IZRG1WxU',
    phase: 'drive',
    title: m.timeline_remote_title,
    body: m.timeline_remote_body
  },
  {
    key: 'firstfield',
    videoId: 'MMicyc1rNyQ',
    phase: 'drive',
    title: m.timeline_firstfield_title,
    body: m.timeline_firstfield_body
  },
  {
    key: 'rtk',
    videoId: 'zZHJYpOB1Gs',
    phase: 'autonomy',
    title: m.timeline_rtk_title,
    body: m.timeline_rtk_body
  },
  {
    key: 'codebase',
    videoId: 'FIysYutWCrc',
    phase: 'vision',
    title: m.timeline_codebase_title,
    body: m.timeline_codebase_body
  },
  {
    key: 'taskmaps',
    videoId: 'tlbdsFL29l0',
    phase: 'autonomy',
    title: m.timeline_taskmaps_title,
    body: m.timeline_taskmaps_body
  },
  {
    key: 'waypoints',
    videoId: 'ns75B_q-mUE',
    phase: 'autonomy',
    title: m.timeline_waypoints_title,
    body: m.timeline_waypoints_body
  },
  {
    key: 'cropmodel',
    videoId: 'TlqnXHRx_Os',
    phase: 'vision',
    title: m.timeline_cropmodel_title,
    body: m.timeline_cropmodel_body
  },
  {
    key: 'heading',
    videoId: 'T8ZPbUqMY8A',
    phase: 'autonomy',
    title: m.timeline_heading_title,
    body: m.timeline_heading_body
  },
  {
    key: 'rain',
    videoId: 'DWKYiGAT5SI',
    phase: 'build',
    title: m.timeline_rain_title,
    body: m.timeline_rain_body
  },
  {
    key: 'hoeing',
    videoId: 'QFVs_-NP0Zs',
    phase: 'vision',
    title: m.timeline_hoeing_title,
    body: m.timeline_hoeing_body
  },
  {
    key: 'tricycle',
    videoId: 'PYb5LuAPigk',
    phase: 'drive',
    title: m.timeline_tricycle_title,
    body: m.timeline_tricycle_body
  },
  {
    key: 'purepursuitfirst',
    videoId: 'LSitvhgaULE',
    phase: 'autonomy',
    title: m.timeline_purepursuitfirst_title,
    body: m.timeline_purepursuitfirst_body
  },
  {
    key: 'globalshutter',
    videoId: 'v1X30zueFwg',
    phase: 'vision',
    title: m.timeline_globalshutter_title,
    body: m.timeline_globalshutter_body
  },
  {
    key: 'design',
    videoId: '60MSzyQkxw8',
    phase: 'build',
    title: m.timeline_design_title,
    body: m.timeline_design_body
  },
  {
    key: 'lasercut',
    videoId: 'iXHmo30YQE0',
    phase: 'build',
    title: m.timeline_lasercut_title,
    body: m.timeline_lasercut_body
  },
  {
    key: 'wheelmodules',
    videoId: 'tX86u9yLPj0',
    phase: 'build',
    title: m.timeline_wheelmodules_title,
    body: m.timeline_wheelmodules_body
  },
  {
    key: 'chassis',
    videoId: '59rHvETqr8k',
    phase: 'build',
    title: m.timeline_chassis_title,
    body: m.timeline_chassis_body
  },
  {
    key: 'hubmotors',
    videoId: 'ynZX2PVavYA',
    phase: 'build',
    title: m.timeline_hubmotors_title,
    body: m.timeline_hubmotors_body
  },
  {
    key: 'electronics',
    videoId: 'ppQcKw95u3E',
    phase: 'drive',
    title: m.timeline_electronics_title,
    body: m.timeline_electronics_body
  },
  {
    key: 'firstdrive',
    videoId: 'w6fEEhQUDJo',
    phase: 'drive',
    title: m.timeline_firstdrive_title,
    body: m.timeline_firstdrive_body
  },
  {
    key: 'casters',
    videoId: 'jciNYXqJc9k',
    phase: 'drive',
    title: m.timeline_casters_title,
    body: m.timeline_casters_body
  },
  {
    key: 'steering',
    videoId: 'epCLpfybDx8',
    phase: 'drive',
    title: m.timeline_steering_title,
    body: m.timeline_steering_body
  },
  {
    key: 'autonomous',
    videoId: 'jFP0uotRBT4',
    phase: 'autonomy',
    title: m.timeline_autonomous_title,
    body: m.timeline_autonomous_body
  },
  {
    key: 'purepursuit',
    videoId: '7sXGuQ1RMKs',
    phase: 'autonomy',
    title: m.timeline_purepursuit_title,
    body: m.timeline_purepursuit_body
  },
  {
    key: 'precision',
    videoId: 'PnqiansWV58',
    phase: 'autonomy',
    title: m.timeline_precision_title,
    body: m.timeline_precision_body
  },
  {
    key: 'speed6',
    videoId: 'jWlJfWt2rw8',
    phase: 'autonomy',
    title: m.timeline_speed6_title,
    body: m.timeline_speed6_body
  },
  {
    key: 'spraybar',
    videoId: 'gEqBgbst-S8',
    phase: 'work',
    title: m.timeline_spraybar_title,
    body: m.timeline_spraybar_body
  },
  {
    key: 'dock',
    videoId: 'GbBcDZ21bIE',
    phase: 'work',
    title: m.timeline_dock_title,
    body: m.timeline_dock_body
  },
  {
    key: 'grassheight',
    videoId: 'slNxeRu5yBM',
    phase: 'work',
    title: m.timeline_grassheight_title,
    body: m.timeline_grassheight_body
  }
];

export const milestoneByVideoId = new Map(milestones.map((item) => [item.videoId, item]));

export const milestoneCount = milestones.length;

export type TimelineEntry = {
  video: Video;
  /** Aanwezig = grote kaart met eigen titel en verhaal; afwezig = compacte regel. */
  milestone?: Milestone;
};

export type TimelineMonth = {
  /** Sorteerbare sleutel, bijvoorbeeld "2026-09". */
  key: string;
  /** Eerste van de maand; de pagina maakt er met de locale een label van. */
  date: string;
  entries: TimelineEntry[];
};

/**
 * Zet de video's om in maanden met daarin de entries, nieuwste eerst.
 * Video's zonder datum (mocht YouTube die ooit niet geven) blijven buiten de
 * tijdlijn: zonder datum is er geen plek op de lijn.
 */
export function buildTimeline(source: Video[]): TimelineMonth[] {
  const sortKey = (video: Video) =>
    milestoneByVideoId.get(video.id)?.sortDate ?? video.published;

  const dated = source
    .filter((video) => video.published)
    .slice()
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));

  const months: TimelineMonth[] = [];

  for (const video of dated) {
    const key = video.published.slice(0, 7);
    let month = months.at(-1);

    if (!month || month.key !== key) {
      month = { key, date: `${key}-01T00:00:00.000Z`, entries: [] };
      months.push(month);
    }

    month.entries.push({ video, milestone: milestoneByVideoId.get(video.id) });
  }

  return months;
}
