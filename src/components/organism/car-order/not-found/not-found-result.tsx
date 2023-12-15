import { PostFilterSave } from "@/apis/filter-save";
import ModalSaveSearch from "@/attom/modals/save-filter-search/save-search";
import { img } from "@/data";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import {
  REMOVE_ALL,
  SET_SHOW_NULL,
  filterSelector,
} from "@/redux/filter/filter-slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NotFoundResult({ cities, models }: any) {
  const [alert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const dataFilter = useAppSelector(filterSelector);
  const { userInfo } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const saveSearchHandler = () => {
    if (userInfo?.phone_number) {
      if (
        dataFilter.shownCars.length !== 0 ||
        dataFilter.min_price !== -1 ||
        dataFilter.max_price !== -1
      ) {
        const postData = {
          brands: dataFilter?.shownCars[0].brand,
          models: dataFilter?.shownCars[0].model,
          min_price:
            dataFilter?.min_price == -1 ? -1 : dataFilter?.min_price / 1000000,
          max_price:
            dataFilter?.max_price == -1 ? -1 : dataFilter?.max_price / 1000000,
          city: "",
          notification_type: "SMS",
          user_name: userInfo?.phone_number,
        };

        PostFilterSave(postData)
          .then(() => {
            setShowAlert(true);
          })
          .catch((err) => {
            toast.error("مشکلی در ذخیره جستجو پیش آمده‌است");
          });
      } else {
        setOpen(true);
      }
    } else {
      router.push("/auth/check");
    }
  };

  const removeAlert = () => {
    setShowAlert(false);
    dispatch(REMOVE_ALL(""));
    dispatch(SET_SHOW_NULL(false));
  };

  const modal_save_search_default_value = {
    brands: dataFilter?.shownCars[0]?.brand,
    city: "",
    max_price: dataFilter?.max_price,
    min_price: dataFilter?.min_price,
    models: dataFilter?.shownCars[0]?.modal,
    notification_type: "SMS",
    user_name: userInfo.phone_number,
  };

  return (
    <div className="col-span-3 mt-16">
      {open &&
        dataFilter.shownCars.length == 0 &&
        dataFilter.min_price == -1 &&
        dataFilter.max_price == -1 && (
          <ModalSaveSearch
            defaultValues={modal_save_search_default_value}
            open={open}
            setOpen={setOpen}
            setShowAlert={setShowAlert}
            cities={cities}
            models={models}
          />
        )}

      {!alert && (
        <div className="h-[65vh]">
          <div className="flex items-center justify-center flex-col">
            <img
              src={img.search_not_found.src}
              alt="404Error"
              className="w-2/4  mx-auto"
            />
            <p className="text-center mt-10 mb-5 font-bold lg:text-2xl md:text-lg ">
              جستجوی موردنظر شما پیدا نشد!
            </p>
            <p className="text-[#6f6f6f] text-center">
              برای اطلاع از موجود شدن آگهی موردنظر، می‌توانید این جستجو را ذخیره
              کنید.
            </p>
            <button
              className="rounded-sm mt-6 text-blue px-8 py-2 bg-[#E3ECFF] w-[195px] mx-auto"
              onClick={saveSearchHandler}
            >
              ذخیره جستجو
            </button>
          </div>
        </div>
      )}

      {alert && (
        <div className="flex justify-center">
          <div className="lg:w-1/2 md:w-2/3 w-full rounded-xl border border-gray-200">
            <span className="border-b border-b-100 p-4 text-lg font-bold text-center block">
              جستجوی اخیر شما ذخیره شد!
            </span>
            <div className="p-4 flex flex-col">
              <div className="p-4 bg-[#EAF1F3] text-blue text-sm font-medium rounded-lg">
                <span className="block">
                  در حال حاضر امکان ذخیره یک «جستجو» وجود دارد.
                </span>
                <p>
                  توجه داشته‌باشید در صورت ذخیره نمودن جستجوی جدید، جستجوی قبلی
                  حذف خواهد شد.
                </p>
              </div>

              <button
                className="border text-gray-500 rounded-lg text-sm py-1 px-2 mx-auto mt-4"
                onClick={removeAlert}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
