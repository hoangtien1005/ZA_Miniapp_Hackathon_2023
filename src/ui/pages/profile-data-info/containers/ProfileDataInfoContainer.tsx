import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import FieldValue from '../components/FieldValue';

import { useGetDetailSubmittedProfileByQuery } from '~/application/submittedProfile/useGetDetailSubmittedProfilesByQuery.usecase';
import { WithdrawProfileUsecase } from '~/application/submittedProfile/withdrawProfileUsecase';
import ROUTES from '~/constants/routes';
// import LOG from '~/log';
import { RemoveDataImg } from '~/ui/assets/images';
import withLayoutWrapper from '~/ui/hocs/with-layout-wrapper';
import { useAppNavigate, useModal } from '~/ui/hooks';
import ModalCustom from '~/ui/shared/Modal';
import Noti from '~/ui/shared/Noti';
import TokenizeImage from '~/ui/shared/TokenizeImage';

const ProfileDataInfoContainer = () => {
  const { leadId, leadType } = useParams();
  const navigate = useAppNavigate();

  const { data } = useGetDetailSubmittedProfileByQuery({
    lead_id: leadId,
    lead_type: Number(leadType),
  });

  useEffect(() => {
  }, []);

  const { show: isShowModal, toggle: toggleModalRemove } = useModal(false);
  const { show: isShowModalSuccess, toggle: toggleModalSuccess } =
    useModal(false);

  const withdraw = () => {
    toggleModalRemove();

    Promise.all([
      WithdrawProfileUsecase({
        lead_uuid: leadId,
        lead_type: Number(leadType),
      }),
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }),
    ]).then((r) => {
      if (r[0].code === 0) {
        toggleModalSuccess();
      }
    });
  };

  const openModalRemoveProfile = () => {
    toggleModalRemove();
  };

  const closeRemoveProfile = () => {
    toggleModalRemove();
  };

  const closeRemoveProfileSuccess = () => {
    toggleModalSuccess();
    navigate(ROUTES.PROFILE_DATA_LIST);
  };

  return (
    <>
      <section className="block_ana has_navBottom pt-24 pb-40">
        <div className="container">
          <Noti
            color="red"
            text="Fiza đang lưu các Thông tin cho quy trình đăng ký Sản phẩm của Quý Khách. Nếu Thu hồi dữ liệu, quy trình sẽ bị hủy."
          />
          <div className="ttl fw-700 mt-24">Thông tin {data?.productName}:</div>
          <div className="module_box mt-16">
            <div className="module_box_heading">
              <div className="ttl">Thông tin được lưu</div>
            </div>
            <div className="module_box_boding">
              <form>
                {data?.name && (
                  <FieldValue label="Họ và tên" value={data?.name} />
                )}
                {data?.gender && (
                  <FieldValue label="Giới tính" value={data?.displayGender} />
                )}
                <div className="flex gap-8">
                  {data?.phone && (
                    <FieldValue label="SĐT" value={data?.phone} />
                  )}
                  {data?.email && (
                    <FieldValue label="Email" value={data?.email} />
                  )}
                </div>
                <div className="flex gap-8">
                  {data?.displayDob && (
                    <FieldValue
                      label="Ngày tháng năm sinh"
                      value={data?.displayDob}
                    />
                  )}
                  {data?.maritalStatus && (
                    <FieldValue
                      label="Tình trạng hôn nhân"
                      value={data?.displayMaritalStatus}
                    />
                  )}
                </div>
                <div className="flex gap-8">
                  {data?.ic && (
                    <FieldValue label="CMND/CCCD" value={data?.ic} />
                  )}
                  {data?.issueDate && (
                    <FieldValue
                      label="Ngày cấp"
                      value={data?.displayIssueDate}
                    />
                  )}
                  {data?.oldIc && (
                    <FieldValue label="Số CMND (cũ)" value={data?.oldIc} />
                  )}
                </div>
                {data?.displayLocation && (
                  <FieldValue
                    label="Địa chỉ nơi ở hiện tại"
                    value={data?.displayLocation}
                  />
                )}
                <div className="flex gap-8">
                  {data?.displayJob && (
                    <FieldValue label="Nghề nghiệp" value={data?.displayJob} />
                  )}
                </div>

                <div className="flex gap-8">
                  {data?.vehiclePlate && (
                    <FieldValue label="Biển số xe" value={data?.vehiclePlate} />
                  )}
                  {data?.frameNumber && (
                    <FieldValue
                      label="Số khung số máy"
                      value={data?.frameNumber}
                    />
                  )}
                </div>

                <div className="flex gap-8">
                  {data?.referencePersonName && (
                    <FieldValue
                      label="Họ và tên (tham chiếu 1)"
                      value={data?.referencePersonName}
                    />
                  )}
                  {data?.referencePersonPhone && (
                    <FieldValue
                      label="Số điện thoại (tham chiếu 1)"
                      value={data?.referencePersonPhone}
                    />
                  )}
                  {data?.referencePersonRelationship && (
                    <FieldValue
                      label="Mối quan hệ (tham chiếu 1)"
                      value={data?.referencePersonRelationship}
                    />
                  )}
                </div>

                <div className="flex gap-8">
                  {data?.referencePersonName2 && (
                    <FieldValue
                      label="Họ và tên (tham chiếu 2)"
                      value={data?.referencePersonName2}
                    />
                  )}
                  {data?.referencePersonPhone2 && (
                    <FieldValue
                      label="Số điện thoại (tham chiếu 2)"
                      value={data?.referencePersonPhone2}
                    />
                  )}
                  {data?.referencePersonRelationship2 && (
                    <FieldValue
                      label="Mối quan hệ (tham chiếu 2)"
                      value={data?.referencePersonRelationship2}
                    />
                  )}
                </div>

                <div className="flex gap-8">
                  {data?.emergencyPhone && (
                    <FieldValue
                      label="Số điện thoại nếu cần liên lạc khẩn cấp"
                      value={data?.emergencyPhone}
                    />
                  )}
                </div>

                {data?.selfieImageUrl && (
                  <div className="group_field">
                    <label>Hình selfie</label>
                    <div className="field_value flex gap-24">
                      <div className="images">
                        <div className="imgDrop">
                          <TokenizeImage src={data?.selfieImageUrl} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {data?.icFrontImageUrl && data?.icBackImageUrl && (
                  <div className="group_field">
                    <label>Hình CMND/CCCD</label>
                    <div className="field_value flex gap-24">
                      <div className="images">
                        <div className="imgDrop">
                          <TokenizeImage src={data?.icFrontImageUrl} />
                        </div>
                      </div>
                      <div className="images">
                        <div className="imgDrop">
                          <TokenizeImage src={data?.icBackImageUrl} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
              <button
                className="btn btn-red w-full block mx-auto mt-16"
                onClick={openModalRemoveProfile}
              >
                Thu hồi dữ liệu
              </button>
            </div>
          </div>
        </div>
      </section>
      <ModalCustom
        visible={isShowModal}
        ttl="Hướng dẫn Thu hồi dữ liệu"
        close={toggleModalRemove}
        clName="remove_close"
        // eslint-disable-next-line react/no-children-prop
        children={
          <>
            <div className="images">
              <img className=" m-auto" src={RemoveDataImg} />
            </div>
            <div className="mt-16">
              Quá trình đăng ký Sản phẩm của Quý khách
              <span className="color_red fw-700">sẽ bị hủy</span> nếu Thu hồi dữ
              liệu. Mọi thông tin đã cung cấp sẽ bị xóa và Quý khách phải đăng
              ký lại từ đầu.
            </div>
            <div className="flex gap-16 mt-16">
              <button
                className="btn btn-primary w-50"
                onClick={closeRemoveProfile}
              >
                Đóng
              </button>
              <button
                className="btn btn-outline-primary w-50"
                onClick={withdraw}
              >
                Thu hồi
              </button>
            </div>
          </>
        }
      />
      <ModalCustom
        visible={isShowModalSuccess}
        ttl="Thu hồi thành công"
        close={toggleModalSuccess}
        clName="remove_close"
        // eslint-disable-next-line react/no-children-prop
        children={
          <>
            <div className="images">
              <img className=" m-auto" src={RemoveDataImg} />
            </div>
            <div className="mt-16">
              <p>
                Yêu cầu Thu hồi dữ liệu của Quý khách đã được tiếp nhận. Fiza sẽ
                xóa tất cả dữ liệu của Quý khách liên quan đến Sản phẩm.
              </p>
            </div>
            <div className="flex gap-16 mt-16 ">
              <button
                className="btn btn-outline-primary btn--m w-100"
                onClick={closeRemoveProfileSuccess}
              >
                Đóng
              </button>
            </div>
          </>
        }
      />
    </>
  );
};

export default withLayoutWrapper(ProfileDataInfoContainer);
