/* eslint-disable prefer-regex-literals */
export const autoTypeOptions = [
  { value: '1', label: 'Chi nhánh Hồ Thị Kỷ' },
  { value: '2', label: 'Chi nhánh Nguyễn Hữu Thọ' },
];

export const timeOptions = Array(48).fill(0).map((_, idx) => {
  const hour = Math.floor(idx / 2);
  const minute = idx % 2 === 0 ? '00' : '30';
  const time = `${hour}:${minute}`;
  return { value: idx, label: time };
})


const validateSchema = {
  startTime: {
    required: 'Vui lòng không để trống',
  },
  endTime: {
    required: 'Vui lòng không để trống',
  },
  date: {
    required: 'Vui lòng không để trống',
  },
  storeId: {
    required: 'Vui lòng không để trống',
  },
};

export default validateSchema;
