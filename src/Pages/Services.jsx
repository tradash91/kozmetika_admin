import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMainCategory,
  deleteMainCategory,
  getServices,
  updateMainCategoryName,
} from "../api/services";
import React, { useState } from "react";
import { uploadImage } from "../utils/uploadImage";
import {
  StyledEditMainCategories,
  StyledMainCategories,
} from "./services.styles";
import SubCategories from "../components/SubCategories";
import SimpleAccordion from "../components/Accordion";
import { StyledCreateMainCategory } from "../components/Subcategories.styles";
import StatusIcon from "../components/StatusIcon";

function Services() {
  const [mainCategory, setMainCategory] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [num, setNum] = useState(0);
  const [isOpen, setIsOpen] = useState(null);
  const [inputData, setInputData] = useState("");
  const [onSubmitHandler, setOnSubmitHandler] = useState(null);
  const [newData, setNewData] = useState("");
  const [field, setField] = useState("");
  const [isChecked, setIsChecked] = useState(null);

  const queryClient = useQueryClient();
  const { isLoading, data: servicesData } = useQuery({
    queryFn: getServices,
    queryKey: ["getServices"],
  });

  ///Create main category
  const { isPending: isCreatingMainCategory, mutate } = useMutation({
    mutationFn: ({ name, bg_url, num }) =>
      createMainCategory({ name, bg_url, num }),
    onSuccess: () => {
      queryClient.invalidateQueries("getServices");
    },
  });

  ///Delete main category
  const {
    isPending: isDeletingMainCategory,
    mutate: mutateDeleteMainCategory,
  } = useMutation({
    mutationFn: deleteMainCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("getServices");
    },
  });

  ///Update main category name
  const {
    isPending: isMainCategoryNameUpdating,
    mutate: mutateUpdateMainCategoryName,
  } = useMutation({
    mutationFn: ({ id, val: value, field }) =>
      updateMainCategoryName({ id, val: value, field }),
    onSuccess: () => {
      queryClient.invalidateQueries("getServices");
    },
  });
  if (
    isLoading ||
    isCreatingMainCategory ||
    isImageUploading ||
    isDeletingMainCategory ||
    isMainCategoryNameUpdating
  )
    return <h1>...Loading</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await uploadImage(setIsImageUploading, "services_bg", image);

    // 2️⃣ DB mentés
    mutate({ name: mainCategory, bg_url: url, num: num });
    setMainCategory("");
    setImage(null);
    setNum(0);
  };
  return (
    <>
      <SimpleAccordion title={"Főkategóriák"}>
        <StyledCreateMainCategory onSubmit={handleSubmit}>
          <label htmlFor="addMainCategory">Név</label>
          <input
            onChange={(e) => {
              setMainCategory(e.target.value);
            }}
            type="text"
            id="addMainCategory"
          />
          <label htmlFor="catImg">Kép</label>
          <input
            id="catImg"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label htmlFor="num">Sorszám</label>
          <input
            onChange={(e) => {
              setNum(Number(e.target.value));
            }}
            type="number"
            id="num"
          />

          <button
            disabled={mainCategory === "" || image === null || num === 0}
            type="submit"
          >
            Létrehozás
          </button>
        </StyledCreateMainCategory>

        <StyledMainCategories>
          {servicesData.map((data) => {
            return (
              <React.Fragment key={data.id}>
                {isOpen !== data.id ? (
                  <li className={"categories"}>
                    <p>
                      <button
                        onClick={() => {
                          setIsOpen(data.id);
                        }}
                      >
                        Szerkesztés
                      </button>
                      {data.name}
                      <StatusIcon color={data.isActive ? "green" : "red"} />
                    </p>

                    <span>
                      Sorszám: <strong>{data.num}</strong>
                    </span>

                    <img src={data.bg_url} alt="" />
                    <button
                      className={"del-btn"}
                      onClick={() => {
                        mutateDeleteMainCategory(data.id);
                      }}
                      disabled={data.sub_categories.length === 0 ? false : true}
                    >
                      Törlés
                    </button>
                  </li>
                ) : (
                  <li className={"editCategories"}>
                    <button
                      className="back-btn"
                      onClick={() => {
                        setIsOpen(null);
                        setIsChecked(null);
                      }}
                    >
                      x
                    </button>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        mutateUpdateMainCategoryName({
                          id: data.id,
                          val: newData,
                          field: field,
                        });
                        setIsOpen(null);
                      }}
                    >
                      <input
                        onChange={(e) => {
                          setField("name");
                          setNewData(e.target.value);
                        }}
                        type="text"
                        id="editName"
                        placeholder="új név"
                      />
                      <button>szerkeszt</button>
                    </form>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        mutateUpdateMainCategoryName({
                          id: data.id,
                          val: newData,
                          field: field,
                        });
                        setIsOpen(null);
                      }}
                    >
                      <input
                        onChange={(e) => {
                          setField("num");
                          setNewData(Number(e.target.value));
                        }}
                        type="number"
                        placeholder="új sorszám"
                      />
                      <button>szerkeszt</button>
                    </form>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const url = await uploadImage(
                          setIsImageUploading,
                          "services_bg",
                          image
                        );
                        mutateUpdateMainCategoryName({
                          id: data.id,
                          val: url,
                          field: field,
                        });
                        setIsOpen(null);
                      }}
                    >
                      {/*  <label htmlFor="newImg">új kép</label> */}
                      <input
                        type="file"
                        accept="image/*"
                        id="newImg"
                        onChange={(e) => {
                          setField("bg_url");
                          setImage(e.target.files[0]);
                        }}
                      />
                      <button type="submit">szerkeszt</button>
                    </form>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        mutateUpdateMainCategoryName({
                          id: data.id,
                          val: isChecked,
                          field: field,
                        });
                        setIsOpen(null);
                        setIsChecked(null);
                      }}
                    >
                      <label htmlFor="isActive">Jelenleg aktív</label>
                      <input
                        onChange={() => {
                          setField("isActive");
                          setIsChecked((checked) => {
                            return !checked ? !data.isActive : !checked;
                          });
                          console.log(isChecked);
                        }}
                        id="isActive"
                        type="checkbox"
                        defaultChecked={data.isActive}
                      />
                      <button type="submit">szerkeszt</button>
                    </form>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </StyledMainCategories>
      </SimpleAccordion>

      <SubCategories mainCategories={servicesData} />
    </>
  );
}

export default Services;
