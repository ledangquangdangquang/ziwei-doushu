import type { BirthFormState } from '@/components/BirthForm';
import type { BirthInfo } from './types';
import { vnBirthToChartInput } from './vn-calendar';
import { VN_PROVINCES } from './vn-provinces';

/** BirthFormState → BirthInfo, qua cùng pipeline lịch/giờ Việt Nam với BirthForm (giờ Tý muộn tính sang ngày sau). */
export function formToBirthInfo(form: BirthFormState): BirthInfo {
  return vnBirthToChartInput({
    year: parseInt(form.year) || 0,
    month: parseInt(form.month) || 0,
    day: parseInt(form.day) || 0,
    clockHour: parseInt(form.clockHour) || 0,
    clockMinute: parseInt(form.clockMinute) || 0,
    unknownTime: form.unknownTime,
    gender: form.gender,
    name: form.name,
    province: VN_PROVINCES.find(p => p.name === form.province),
  }).birthInfo;
}

/** BirthFormState → URLSearchParams (link chia sẻ) */
export function formToSearchParams(form: BirthFormState): URLSearchParams {
  const p = new URLSearchParams();
  if (form.name) p.set('n', form.name);
  p.set('y', form.year);
  p.set('m', form.month);
  p.set('d', form.day);
  if (form.unknownTime) {
    p.set('u', '1');
  } else {
    p.set('h', form.clockHour);
    p.set('mi', form.clockMinute);
  }
  if (form.province) p.set('p', form.province);
  if (form.city) p.set('c', form.city);
  if (form.longitude && form.longitude !== 105) p.set('lo', String(form.longitude));
  p.set('g', form.gender === 'male' ? 'm' : 'f');
  return p;
}

/** URLSearchParams → Partial<BirthFormState>; thiếu dữ liệu thì trả về null */
export function searchParamsToForm(params: URLSearchParams): Partial<BirthFormState> | null {
  const year = params.get('y');
  const month = params.get('m');
  const day = params.get('d');
  if (!year || !month || !day) return null;
  return {
    name: params.get('n') || '',
    year,
    month,
    day,
    unknownTime: params.get('u') === '1',
    clockHour: params.get('h') || '8',
    clockMinute: params.get('mi') || '0',
    province: params.get('p') || '',
    city: params.get('c') || '',
    longitude: parseFloat(params.get('lo') || '105'),
    gender: params.get('g') === 'f' ? 'female' : 'male',
  };
}
