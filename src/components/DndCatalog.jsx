// import Circle from "../assets/Circle";
import debounce from "debounce";
import { useSelector, useDispatch } from "react-redux";
// import  { useState } from "react";

import { TESelect } from "tw-elements-react";
import Card from "./Card";

import { useRef, useState, useCallback, useEffect } from "react";

import {
  setBrand,
  setCatalog,
  setCountry,
  setSearchValue,
} from "../redux/slices/filterSlice";
import Pagination from "./Pagination";
import { setCurrentPage, setItemsWidth } from "../redux/slices/paginationSlice";
import { fetchProduct } from "../redux/slices/itemsSlice";

const Accordion = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const itemsRef = useRef(null);
  const { product, status } = useSelector((state) => state.items);

  const { brand, country, searchValue, catalog } = useSelector(
    (state) => state.filter
  );
  const { itemsPerPage, currentPage } = useSelector(
    (state) => state.paginationSlice
  );
  const [localSearchValue, setLocalSearchValue] = useState("");
  useEffect(() => {
    dispatch(setItemsWidth(itemsRef.current.offsetWidth));
  }, []);
  useEffect(() => {
    dispatch(fetchProduct(catalog));
  }, [catalog]);
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
      dispatch(setCurrentPage(1));
      // console.log(str);
    }, 1000),
    []
  );
  const onChangeInput = (event) => {
    setLocalSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const countryArray = [
    { text: "Любая", value: "" },
    { text: "Россия", value: "Russia" },
    { text: "Германия", value: "Germany" },
    { text: "Армения", value: "Armenia" },
    { text: "Корея", value: "Korea" },
  ];
  const brandArray = [
    { text: "Любой", value: "" },
    { text: "K&G(Esse, Bohem)", value: "kg" },
    { text: "Филлип Моррис (Marlboro, Parliament,Next)", value: "pmi" },
    { text: "BAT (Ява, Kent, Rothmans)", value: "bat" },
    { text: "JTI (Wingston, Camel,LD)", value: "jti" },
    { text: "VonEiken (Chapman, Pepe,Harvest)", value: "VonEiken" },
    { text: "Grand Tobacco (Vip,Triumph,Ararat)", value: "gt" },
    { text: "Cigaronne", value: "cigaronne" },
    { text: "Peppel", value: "peppell" },
  ];
  const catalogArray = [
    { text: "Сигареты, сигариллы", value: "cigarettes" },
    { text: "Табак", value: "tobacco" },
    { text: "Напитки", value: "drinks" },
    { text: "Аксессуары и другое", value: "other" },
  ];

  return (
    <div className="flex justify-center">
      <div
        className="relative sm:w-[1250px] h-fit w-[320px]  bg-[#191d21] rounded-[20px] 
     before:transform before:skew-y-[345deg] before:transition-[0.5s]
     card hover:before:top-[-70%] hover:before:transform hover:before:skew-y-[390deg] p-6 "
      >
        <div className="flex  p-3 sm:p-6   flex-col w-full sm:w-[calc(100%)-5em] h-full ">
          {/* группировка товаров */}
          <div className="flex w-full justify-start flex-wrap pb-2">
            <div className="flex justify-end pr-6 pb-2">
              <div className="relative  sm:w-[200px] w-[250px] ">
                <TESelect
                  visibleOptions={4}
                  data={catalogArray}
                  label="Ассортимент"
                  onOptionSelect={(obj) => {
                    dispatch(setCatalog(obj.value));
                    dispatch(setCurrentPage(1));
                  }}
                />
              </div>
            </div>
            <div className="flex ">
              <div className="relative  sm:w-[200px] w-[250px]  sm:pr-6 pb-2">
                {catalog === "cigarettes" && (
                  <TESelect
                    data={countryArray}
                    label="Страна"
                    onOptionSelect={(obj) => {
                      dispatch(setCountry(obj.value));
                      dispatch(setCurrentPage(1));
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end pr-6 pb-2">
              <div className="relative  sm:w-[380px] w-[250px] ">
                {catalog === "cigarettes" && (
                  <TESelect
                    visibleOptions={8}
                    data={brandArray}
                    label="Бренд"
                    onOptionSelect={(obj) => {
                      dispatch(setBrand(obj.value));
                      dispatch(setCurrentPage(1));
                    }}
                  />
                )}
              </div>
            </div>

            <div className="relative">
              {catalog === "cigarettes" ? (
                <div className="relative mb-4 flex w-full flex-wrap items-stretch pb-2">
                  <input
                    ref={inputRef}
                    value={localSearchValue}
                    onChange={(event) => onChangeInput(event)}
                    type="search"
                    className="relative xl:w-50 w-[204px] m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:focus:text-neutral-100 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Поиск"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                  />

                  {/* <!--Search icon--> */}
                  <span
                    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* блок с товарами */}

          {catalog === "cigarettes" && status === "loaded" ? (
            <>
              <div
                className="   grid-cols-2  grid md:grid-cols-[repeat(auto-fill,_215px)] gap-4 pb-1 "
                ref={itemsRef}
              >
                {product
                  .filter(
                    (obj) =>
                      (country === obj.country || country === "") &
                      (obj.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                        searchValue === "") &
                      (brand === obj.brand || brand === "")
                  )
                  .map((obj, index) => <Card {...obj} key={index} />)
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
              </div>
              <Pagination />
            </>
          ) : (
            <div
              className="   grid-cols-2  grid md:grid-cols-[repeat(auto-fill,_215px)] gap-4 pb-1 "
              ref={itemsRef}
            ></div>
          )}
          {catalog !== "cigarettes" && status === "loaded" ? (
            <>
              <div
                className="grid-cols-2  grid md:grid-cols-[repeat(auto-fill,_215px)] gap-4 pb-1"
                ref={itemsRef}
              >
                {product.map((obj, index) => (
                  <Card {...obj} key={index} />
                ))}
              </div>
            </>
          ) : (
            <div
              className="   grid-cols-2  grid md:grid-cols-[repeat(auto-fill,_215px)] gap-4 pb-1 "
              ref={itemsRef}
            ></div>
          )}

          {/* это для перелистывания (пагинация) */}
        </div>

        {/* <div className="flex flex-col mt-3 w-48  text-gray-400  rounded"> */}
        {/* <p className="flex items-center w-full px-6 mt-3">
            <Circle />
            <span className="ml-2 text-sm font-bold ">Каталог</span>
          </p> */}

        {/* <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
              <p className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <span className="ml-2 text-sm font-medium">
                  Кальяны, табак, аксессуары
                </span>
              </p>
              <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>
              <p className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <span className="ml-2 text-sm font-medium">Самокрутки</span>
              </p>
              <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>
              <p className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <span className="ml-2 text-sm font-medium">
                  Системы нагревания табака
                </span>
              </p>
              <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>
              <p className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <span className="ml-2 text-sm font-medium">
                  Сигары и сигариллы
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
              <p className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <span className="ml-2 text-sm font-medium">
                  Сигареты папиросы
                </span>
              </p>
            </div>
          </div> */}
      </div>
    </div>

    // </div>
  );
};

export default Accordion;
