// Het datamodel achter de configurator-pagina.
//
// Zes rollen, elk met een handvol modules. De volgorde van de rollen is ook de
// bouwvolgorde: eerst de wielen, dan het frame, dan wat er bovenop komt.
//
// Eén harde regel: minstens één as moet aangedreven zijn. Een zwenkwiel en een
// gestuurd normaal wiel hebben geen hubmotor, dus twee van die assen samen
// geven een robot die nergens heen rijdt. De voorwielen kies je vrij; de
// achterwielen passen zich daaraan aan.
//
// Rupsen zitten alleen op de achterrol: ze lopen over de hele lengte door, dus
// dan is er geen voorwiel meer en telt de keuze op de voorrol niet mee.

import * as m from '$lib/paraglide/messages.js';

export type WheelId =
  | 'fixed_hub'
  | 'caster'
  | 'steer_hub'
  | 'steer_plain'
  | 'big_hub'
  | 'big_steer_hub'
  | 'tracks';
export type FrameId = 'standard' | 'raised' | 'lowered' | 'side_high';
export type ControlId = 'rtk' | 'camera' | 'lidar' | 'joystick';
export type BatteryId = 'swap' | 'big';
export type ChargeId = 'plug' | 'solar' | 'generator';

export type Config = {
  front: WheelId;
  rear: WheelId;
  frame: FrameId;
  control: ControlId;
  battery: BatteryId;
  charge: ChargeId;
};

export type ReelKey = keyof Config;

export type Option = {
  id: string;
  label: () => string;
  desc: () => string;
};

export type Reel = {
  key: ReelKey;
  title: () => string;
  options: Option[];
};

const wheelOptions: Option[] = [
  { id: 'fixed_hub', label: m.configurator_wheel_fixed_hub, desc: m.configurator_wheel_fixed_hub_desc },
  { id: 'caster', label: m.configurator_wheel_caster, desc: m.configurator_wheel_caster_desc },
  { id: 'steer_hub', label: m.configurator_wheel_steer_hub, desc: m.configurator_wheel_steer_hub_desc },
  { id: 'steer_plain', label: m.configurator_wheel_steer_plain, desc: m.configurator_wheel_steer_plain_desc },
  { id: 'big_hub', label: m.configurator_wheel_big_hub, desc: m.configurator_wheel_big_hub_desc },
  {
    id: 'big_steer_hub',
    label: m.configurator_wheel_big_steer_hub,
    desc: m.configurator_wheel_big_steer_hub_desc
  }
];

const rearOptions: Option[] = [
  ...wheelOptions,
  { id: 'tracks', label: m.configurator_wheel_tracks, desc: m.configurator_wheel_tracks_desc }
];

export const reels: Reel[] = [
  { key: 'front', title: m.configurator_reel_front, options: wheelOptions },
  { key: 'rear', title: m.configurator_reel_rear, options: rearOptions },
  {
    key: 'frame',
    title: m.configurator_reel_frame,
    options: [
      { id: 'standard', label: m.configurator_frame_standard, desc: m.configurator_frame_standard_desc },
      { id: 'raised', label: m.configurator_frame_raised, desc: m.configurator_frame_raised_desc },
      { id: 'lowered', label: m.configurator_frame_lowered, desc: m.configurator_frame_lowered_desc },
      { id: 'side_high', label: m.configurator_frame_side_high, desc: m.configurator_frame_side_high_desc }
    ]
  },
  {
    key: 'control',
    title: m.configurator_reel_control,
    options: [
      { id: 'rtk', label: m.configurator_control_rtk, desc: m.configurator_control_rtk_desc },
      { id: 'camera', label: m.configurator_control_camera, desc: m.configurator_control_camera_desc },
      { id: 'lidar', label: m.configurator_control_lidar, desc: m.configurator_control_lidar_desc },
      { id: 'joystick', label: m.configurator_control_joystick, desc: m.configurator_control_joystick_desc }
    ]
  },
  {
    key: 'battery',
    title: m.configurator_reel_battery,
    options: [
      { id: 'swap', label: m.configurator_battery_swap, desc: m.configurator_battery_swap_desc },
      { id: 'big', label: m.configurator_battery_big, desc: m.configurator_battery_big_desc }
    ]
  },
  {
    key: 'charge',
    title: m.configurator_reel_charge,
    options: [
      { id: 'plug', label: m.configurator_charge_plug, desc: m.configurator_charge_plug_desc },
      { id: 'solar', label: m.configurator_charge_solar, desc: m.configurator_charge_solar_desc },
      { id: 'generator', label: m.configurator_charge_generator, desc: m.configurator_charge_generator_desc }
    ]
  }
];

/** De robot zoals hij nu gebouwd wordt: vaste hubmotoren voor, zwenkwielen achter. */
export const defaultConfig: Config = {
  front: 'fixed_hub',
  rear: 'caster',
  frame: 'standard',
  control: 'rtk',
  battery: 'big',
  charge: 'plug'
};

export const isDriven = (wheel: WheelId) => wheel !== 'caster' && wheel !== 'steer_plain';
export const isSteered = (wheel: WheelId) =>
  wheel === 'steer_hub' || wheel === 'steer_plain' || wheel === 'big_steer_hub';
export const isBig = (wheel: WheelId) => wheel === 'big_hub' || wheel === 'big_steer_hub';
export const hasTracks = (c: Config) => c.rear === 'tracks';

/** Achterwiel-opties die met deze voorwielen geen aandrijving meer overlaten. */
export function lockedRear(front: WheelId): Set<string> {
  if (isDriven(front)) return new Set();
  return new Set(rearOptions.map((o) => o.id).filter((id) => !isDriven(id as WheelId)));
}

export function driveLabel(c: Config): string {
  if (hasTracks(c)) return m.configurator_drive_tracks();
  if (isDriven(c.front) && isDriven(c.rear)) return m.configurator_drive_4wd();
  return isDriven(c.front) ? m.configurator_drive_2wd_front() : m.configurator_drive_2wd_rear();
}

export function steeringLabel(c: Config): string {
  if (hasTracks(c)) return m.configurator_steer_tracks();
  const front = isSteered(c.front);
  const rear = isSteered(c.rear);
  if (front && rear) return m.configurator_steer_all();
  if (front) return m.configurator_steer_front();
  if (rear) return m.configurator_steer_rear();
  if (c.front === 'caster' || c.rear === 'caster') return m.configurator_steer_caster();
  return m.configurator_steer_skid();
}

export function tractionLabel(c: Config): string {
  if (hasTracks(c)) return m.configurator_traction_tracks();
  if (isBig(c.front) || isBig(c.rear)) return m.configurator_traction_huge();
  if (isDriven(c.front) && isDriven(c.rear)) return m.configurator_traction_high();
  return m.configurator_traction_standard();
}
