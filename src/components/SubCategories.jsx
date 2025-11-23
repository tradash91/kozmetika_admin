import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubCategory,
  deleteSubCategory,
  getSubcategory,
  updateSubcategory,
} from "../api/services";
import SimpleAccordion from "./Accordion";
import React, { useEffect, useState } from "react";

import {
  StyledCreateMainCategory,
  StyledCreateSubCategory,
  StyledEditSubcategories,
  StyledSubCategories,
} from "./Subcategories.styles";
import StatusIcon from "./StatusIcon";
import { strong } from "motion/react-client";

function SubCategories({ mainCategories }) {
  const [subCategoryDetail, setSubcategoryDetail] = useState();
  const [isSubActive, setIsSubActive] = useState(null);
  const [subCategoryData, setSubcategoryData] = useState({
    subCategoryID: 0,
    subCategoryName: "",
    name: "",
    price: "",
    duration: "",
    description: "",
    details: [],
    isActive: null,
  });
  const [isSubEditOpen, setIsSubEditOpen] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    details: [],
  });

  const queryClient = useQueryClient();
  const { isLoading: isSubcategoriesLoading, data: subCategoriesData } =
    useQuery({
      queryFn: getSubcategory,
      queryKey: ["getSubcategories"],
    });

  const { mutate: createSub, isPending: isCreatingSubcategory } = useMutation({
    mutationFn: ({
      category_id,
      name,
      description,
      duration,
      price,
      details,
      category_name,
    }) =>
      createSubCategory({
        category_id,
        name,
        description,
        duration,
        price,
        details,
        category_name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("getSubcategories");
    },
  });

  ///delete subcategory

  const { isPending: isDeletingSubcategory, mutate: mutateDeleteSubcategory } =
    useMutation({
      mutationFn: deleteSubCategory,
      onSuccess: () => {
        queryClient.invalidateQueries("getSubcategories");
      },
    });

  ///update subcategory
  const { isPending: isSubcategoryUpdating, mutate: mutateUpdateSubcategory } =
    useMutation({
      mutationFn: ({ id, val: subCategoryData }) =>
        updateSubcategory({ id, val: subCategoryData }),
      onSuccess: () => {
        queryClient.invalidateQueries("getSubcategories");
      },
    });

  if (isSubcategoriesLoading || isCreatingSubcategory)
    return <h1>...loading</h1>;
  return (
    <SimpleAccordion title={"Alkategóriák"}>
      <SimpleAccordion title={<strong>+ Kategória hozzáadása</strong>}>
        <div>
          <StyledCreateSubCategory
            onSubmit={(e) => {
              e.preventDefault();
              createSub({
                category_id: subCategoryData.subCategoryID,
                name: subCategoryData.name,
                description: subCategoryData.description,
                duration: subCategoryData.duration,
                price: subCategoryData.price,
                details: subCategoryData.details,
                category_name: subCategoryData.subCategoryName,
              });
              setSubcategoryData({
                subCategoryID: 0,
                subCategoryName: "",
                name: "",
                price: "",
                duration: "",
                description: "",
                details: [],
              });
              setSubcategoryDetail();
            }}
          >
            <select
              className="cat"
              onChange={(e) => {
                setSubcategoryData(() => {
                  const option = e.target.selectedOptions[0];
                  return {
                    ...subCategoryData,
                    subCategoryName: option.dataset.name,
                    subCategoryID: Number(e.target.value),
                  };
                });
              }}
            >
              <option>Kategória</option>
              {mainCategories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id} data-name={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <div className="name">
              <input
                placeholder="Név"
                onChange={(e) => {
                  setSubcategoryData({
                    ...subCategoryData,
                    name: e.target.value,
                  });
                }}
                type="text"
                id="subCategoryName"
              />
            </div>
            <div className="description">
              <textarea
                placeholder="Leírás"
                onChange={(e) => {
                  setSubcategoryData({
                    ...subCategoryData,
                    description: e.target.value,
                  });
                }}
                id="subCategoryDescription"
              />
            </div>
            <div className="duration">
              <input
                placeholder="Időtartam"
                onChange={(e) => {
                  setSubcategoryData({
                    ...subCategoryData,
                    duration: e.target.value,
                  });
                }}
                type="text"
                id="subCategoryDuration"
              />
            </div>
            <div className="price">
              <input
                placeholder="Ár"
                onChange={(e) => {
                  setSubcategoryData({
                    ...subCategoryData,
                    price: e.target.value,
                  });
                }}
                type="text"
                id="subCategoryPrice"
              />
            </div>
            <div className="details">
              <textarea
                placeholder="Lépések"
                onChange={(e) => {
                  const val = e.target.value;
                  setIsSubEditOpen(false);
                  console.log(e.target.value);
                  setSubcategoryDetail(val.replace(/"/g, "").split(","));
                }}
                type="text"
                id="subCategoryDetails"
              />
              <span
                onClick={() => {
                  setSubcategoryData({
                    ...subCategoryData,
                    details: subCategoryDetail,
                  });
                }}
              >
                hozzáadás
              </span>
              <ul>
                {!isSubEditOpen &&
                  subCategoryDetail?.map((detail, index) => {
                    return <li key={index}>{detail}</li>;
                  })}
              </ul>
            </div>
            <button
              disabled={
                subCategoryData.name === "" ||
                subCategoryData.subCategoryName === "" ||
                subCategoryData.price === "" ||
                subCategoryData.duration === "" ||
                subCategoryData.description === "" ||
                subCategoryData.details.length === 0
              }
              className="sub-btn"
              type="submit"
            >
              Létrehozás
            </button>
          </StyledCreateSubCategory>
        </div>
      </SimpleAccordion>
      <div>
        <ul>
          {isDeletingSubcategory && <h1>...loading</h1>}
          {mainCategories.map((cat) => {
            return (
              <li key={cat.id}>
                <SimpleAccordion title={cat.name}>
                  <StyledSubCategories>
                    {cat.sub_categories.map((sub, index) => {
                      return (
                        <React.Fragment key={sub.id}>
                          {isSubcategoryUpdating && sub.id === isSubEditOpen ? (
                            <h1>...betöltés</h1>
                          ) : (
                            <SimpleAccordion title={`- ${sub.name}`}>
                              <li>
                                <div className="sub">
                                  <div className="btn-wrapper">
                                    <button
                                      onClick={() => {
                                        mutateDeleteSubcategory(sub.id);
                                      }}
                                      className={"delete"}
                                    >
                                      Törlés
                                    </button>
                                    <button
                                      onClick={() => {
                                        setIsSubEditOpen(sub.id);
                                        setSubcategoryDetail();
                                        setSubcategoryData({
                                          subCategoryID: sub.category_id,
                                          subCategoryName: sub.category_name,
                                          name: sub.name,
                                          price: sub.price,
                                          duration: sub.duration,
                                          description: sub.description,
                                          details: sub.details,
                                          isActive: true,
                                        });
                                        console.log(sub);
                                      }}
                                      className={"edit"}
                                    >
                                      Szerkesztés
                                    </button>
                                  </div>
                                  <span>
                                    Jelenleg aktív
                                    <StatusIcon
                                      color={sub.isActive ? "green" : "red"}
                                    />
                                  </span>

                                  <span>
                                    <strong>Név:</strong> {sub.name}
                                  </span>
                                  <span>
                                    <strong>Ár:</strong> {sub.price} Ft{" "}
                                  </span>
                                  <span>
                                    <strong>Időtartam:</strong> {sub.duration}{" "}
                                    Perc{" "}
                                  </span>
                                  <span>
                                    <strong>Leírás:</strong> {sub.description}
                                  </span>

                                  <span>
                                    <strong>Lépések:</strong>
                                  </span>
                                  <div className={"details"}>
                                    {sub.details?.map((detail, index) => {
                                      return (
                                        <span key={index}>- {detail}</span>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="">
                                  {isSubEditOpen === sub.id && (
                                    <StyledEditSubcategories
                                      onSubmit={(e) => {
                                        e.preventDefault();
                                        mutateUpdateSubcategory({
                                          id: sub.id,
                                          val: subCategoryData,
                                        });
                                        setIsSubEditOpen(null);
                                      }}
                                    >
                                      <span
                                        className="close-btn"
                                        onClick={() => {
                                          setIsSubEditOpen(null);
                                        }}
                                      >
                                        X
                                      </span>
                                      <select
                                        onChange={(e) => {
                                          setSubcategoryData(() => {
                                            const option =
                                              e.target.selectedOptions[0];
                                            return {
                                              ...subCategoryData,
                                              subCategoryName:
                                                option.dataset.name,
                                              subCategoryID: Number(
                                                e.target.value
                                              ),
                                            };
                                          });
                                        }}
                                      >
                                        <option>Kategória</option>
                                        {mainCategories.map((category) => {
                                          return (
                                            <option
                                              key={category.id}
                                              value={category.id}
                                              data-name={category.name}
                                            >
                                              {category.name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                      <div>
                                        <input
                                          placeholder="Név"
                                          onChange={(e) => {
                                            setSubcategoryData({
                                              ...subCategoryData,
                                              name:
                                                e.target.value.length >= 1
                                                  ? e.target.value
                                                  : cat.name,
                                            });
                                          }}
                                          type="text"
                                          id="subCategoryName"
                                        />
                                      </div>
                                      <div>
                                        <textarea
                                          placeholder="Leírás"
                                          onChange={(e) => {
                                            setSubcategoryData({
                                              ...subCategoryData,
                                              description:
                                                e.target.value.length >= 1
                                                  ? e.target.value
                                                  : cat.description,
                                            });
                                          }}
                                          id="subCategoryDescription"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          placeholder="Időtartam"
                                          onChange={(e) => {
                                            setSubcategoryData({
                                              ...subCategoryData,
                                              duration:
                                                e.target.value.length >= 1
                                                  ? e.target.value
                                                  : cat.duration,
                                            });
                                          }}
                                          type="text"
                                          id="subCategoryDuration"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          placeholder="Ár"
                                          onChange={(e) => {
                                            console.log(e.target.value);
                                            setSubcategoryData({
                                              ...subCategoryData,
                                              price:
                                                e.target.value.length >= 1
                                                  ? e.target.value
                                                  : cat.price,
                                            });
                                          }}
                                          type="text"
                                          id="subCategoryPrice"
                                        />
                                      </div>
                                      <div>
                                        <label htmlFor="isActive">
                                          Jelenleg aktív
                                        </label>
                                        <input
                                          id="isActive"
                                          onChange={() => {
                                            setIsSubActive((prev) => {
                                              const newActive = !prev
                                                ? !sub.isActive
                                                : !prev;
                                              setSubcategoryData({
                                                ...subCategoryData,
                                                isActive: newActive,
                                              });
                                              return newActive;
                                            });
                                          }}
                                          type="checkbox"
                                          defaultChecked={sub.isActive}
                                        />
                                      </div>

                                      <div className="editSteps">
                                        <textarea
                                          placeholder="Lépések"
                                          onChange={(e) => {
                                            const val = e.target.value;
                                            setSubcategoryDetail(
                                              val.length >= 1
                                                ? val
                                                    .replace(/"/g, "")
                                                    .split(",")
                                                : cat.details
                                            );
                                          }}
                                          type="text"
                                          id="subCategoryDetails"
                                        />
                                        <span
                                          onClick={() => {
                                            setSubcategoryData({
                                              ...subCategoryData,
                                              details: subCategoryDetail,
                                            });
                                          }}
                                        >
                                          Hozzáadás
                                        </span>
                                        <ul>
                                          {subCategoryDetail?.map(
                                            (detail, index) => {
                                              return (
                                                <li key={index}>{detail}</li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </div>
                                      <button type="submit">Szerkesztés</button>
                                    </StyledEditSubcategories>
                                  )}
                                </div>
                              </li>
                            </SimpleAccordion>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </StyledSubCategories>
                </SimpleAccordion>
              </li>
            );
          })}
        </ul>
      </div>
    </SimpleAccordion>
  );
}

export default SubCategories;
