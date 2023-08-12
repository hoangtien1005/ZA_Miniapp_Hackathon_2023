import React, { useState } from 'react';
import { DetailImg, DetailVoucherImg } from '~/ui/assets/images';

import '~/ui/assets/scss/profile.scss';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import { useModal } from '~/ui/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalCustom from '~/ui/shared/Modal';
import classNames from 'classnames';
import SelectWithSearchSheet from '~/ui/shared/SelectWithSearchSheet';
import validateSchema, { autoTypeOptions, timeOptions } from './validate';
import { Page, Box, Text, Select } from "zmp-ui";
import { getBooking } from '~/application/submittedProfile/withdrawProfileUsecase';
import { addMinutesToDate } from '~/utils/datetime.util';

interface IFormInput {
  // date: Date;
  startTime: number;
  endTime: number;
  storeId: number;
}

const getCurrentMidnightDate = () => {
  var d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

const BookingContainer = () => {
  const { show: isShowModal, toggle: toggleModalRemove } = useModal(false);
  const [storeId, setStoreId] = useState(
  );

  const [startTime, setStartTime] = useState(
  );

  const [endTime, setEndTime] = useState(
  );

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    setFocus,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {},
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    getBooking({
      start_time: addMinutesToDate(getCurrentMidnightDate(), data.startTime).getTime(),
      end_time: addMinutesToDate(getCurrentMidnightDate(), data.endTime).getTime(),
      store_id: data.storeId,
    })
  };

  const handleCancel = () => {
    toggleModalRemove();
  }

  const handleSelectStoreId = (value: string, label: string) => {
    // @ts-ignore
    setStoreId({ value, label });
    setValue('storeId', +value);
    trigger('storeId');
  };

  const handleSelectStartTime = (value: string, label: string) => {
    // @ts-ignore
    setStartTime({ value, label });
    setValue('startTime', +value);
    trigger('startTime');
  };

  const handleSelectEndTime = (value: string, label: string) => {
    // @ts-ignore
    setEndTime({ value, label });
    setValue('endTime', +value);
    trigger('endTime');
  };

  return (
    <>
      <section className="sec_booking">
        <div className="con">
          <img className="oa-img" src={DetailImg} />
          <div className='info-zone'>
            <div className="oa-info">
              <h1>Black cat Catering</h1>
              <p>Chúng tôi Blackcat catering chuyên cung cấp dịch vụ ăn uống, căn tin,food court cho các công ty, trường học, nhà hàng. </p>
            </div>
            <div className="vouchers">
              <h2>Khuyến mãi hôm nay</h2>

              <div className="detail">
                <img src={DetailVoucherImg} />
                <div>
                  <h3>Giảm 20% trên giá món</h3>
                  <p>Giảm 20% khi đi chung với bạn của Ú Meal</p>
                </div>
              </div>
            </div>


            <form
              className="group-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1>Chọn lịch ăn uống</h1>
              <div
                className={classNames(
                  'group_field',
                  errors.storeId && 'field_err'
                )}
              >
                <label>Chi nhánh</label>
                <SelectWithSearchSheet
                  title="Chọn chi nhánh"
                  placeholder="Chi nhánh"
                  // @ts-ignore
                  value={storeId?.label}
                  placeholderSearch="Tìm kiếm"
                  register={register}
                  trigger={trigger}
                  registerOption={validateSchema.storeId}
                  name="storeId"
                  // @ts-ignore
                  listOption={autoTypeOptions}
                  onClickItem={handleSelectStoreId}
                  error={errors.storeId?.message}
                />

                {errors.storeId && (
                  <div className="text_err fz-12 color_red">
                    {errors.storeId.message}
                  </div>
                )}
              </div>

              <div
                className={classNames(
                  'group_field',
                  errors.startTime && 'field_err'
                )}
              >
                <label>Thời gian bắt đầu</label>
                <SelectWithSearchSheet
                  title="Chọn thời gian bắt đầu"
                  placeholder="Thời gian bắt đầu"
                  // @ts-ignore
                  value={startTime?.label}
                  placeholderSearch="Tìm kiếm"
                  register={register}
                  trigger={trigger}
                  registerOption={validateSchema.startTime}
                  name="startTime"
                  // @ts-ignore
                  listOption={timeOptions}
                  onClickItem={handleSelectStartTime}
                  error={errors.startTime?.message}
                />

                {errors.startTime && (
                  <div className="text_err fz-12 color_red">
                    {errors.startTime.message}
                  </div>
                )}
              </div>

              <div
                className={classNames(
                  'group_field',
                  errors.endTime && 'field_err'
                )}
              >
                <label>Thời gian kết thúc</label>
                <SelectWithSearchSheet
                  title="Chọn thời gian kết thúc"
                  placeholder="Thời gian kết thúc"
                  // @ts-ignore
                  value={endTime?.label}
                  placeholderSearch="Tìm kiếm"
                  register={register}
                  trigger={trigger}
                  registerOption={validateSchema.endTime}
                  name="endTime"
                  // @ts-ignore
                  listOption={timeOptions}
                  onClickItem={handleSelectEndTime}
                  error={errors.endTime?.message}

                />

                {errors.endTime && (
                  <div className="text_err fz-12 color_red">
                    {errors.endTime.message}
                  </div>
                )}
              </div>

              {/* <div className="flex gap-8">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                type="submit"
                className={`btn btn-primary`}
              >
                Đặt lịch hẹn
              </button>
            </div> */}

              <button
                className="btn btn-primary w-100"
                type="submit"
              >
                Tìm người ăn chung
              </button>
            </form>

          </div>
        </div>
      </section>


      {/* <ModalCustom
        visible={isShowModal}
        ttl="Đặt lịch hẹn"
        close={toggleModalRemove}
        clName="remove_close"
        children={
          <form
            className="group"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              className={classNames(
                'group_field',
                errors.storeId && 'field_err'
              )}
            >
              <label>Chi nhánh</label>
              <SelectWithSearchSheet
                title="Chọn chi nhánh"
                placeholder="Chi nhánh"
                // @ts-ignore
                value={storeId?.label}
                placeholderSearch="Tìm kiếm"
                register={register}
                trigger={trigger}
                registerOption={validateSchema.storeId}
                name="storeId"
                // @ts-ignore
                listOption={autoTypeOptions}
                onClickItem={handleSelectInsuranceLiability}
                error={errors.storeId?.message}
              />
             
              {errors.storeId && (
                <div className="text_err fz-12 color_red">
                  {errors.storeId.message}
                </div>
              )}
            </div>

            <div className="flex gap-8">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                type="submit"
                className={`btn btn-primary`}
              >
                Đặt lịch hẹn
              </button>
            </div>
          </form>
        }
      /> */}
    </>
  );
};

export default withLayoutWrapper(BookingContainer);
