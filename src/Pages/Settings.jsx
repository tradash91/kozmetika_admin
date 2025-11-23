import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getContacts,
  getOpeningHours,
  getSettings,
  getSocial,
  updateContacts,
  updateLinks,
  updateOpeningHour,
  updateSettings,
} from "../api/settings";
import { useState } from "react";
import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";

const StyledMain = styled.main`
  font-size: 16px;
  padding: 2rem 4rem;
  p {
    font-size: 13px;
    strong {
      font-size: 15px;
    }
  }
  li {
    display: grid;
    grid-template-columns: 400px 1fr auto;
    word-wrap: break-word;
    gap: 2rem;

    p {
      background-color: #80808022;
      padding: 0 1rem;
    }

    input {
      font-size: 14px;
    }
    button {
      background-color: var(--green-500);
      color: var(--neutral-0);
      align-self: center;
      justify-self: center;
    }
  }
  ul {
    ${flex("column")}
    align-items: stretch;
    gap: 1rem;
  }
`;

function Settings() {
  const [time, setTime] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [setting, setSetting] = useState("");
  const [contact, setContact] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryFn: getOpeningHours,
    queryKey: ["getOpeningHours"],
  });

  const { isLoading: isSocialLoading, data: socialData } = useQuery({
    queryFn: getSocial,
    queryKey: ["getSocial"],
  });

  const { isLoading: isSettingsLoading, data: settingsData } = useQuery({
    queryFn: getSettings,
    queryKey: ["getSettings"],
  });

  const { isLoading: isContactsLoading, data: contactsData } = useQuery({
    queryFn: getContacts,
    queryKey: ["getContacts"],
  });

  const {
    mutate,
    isPending: updatingHours,
    error,
  } = useMutation({
    mutationFn: ({ id, time }) => updateOpeningHour({ id, time }),
    onSuccess: () => {
      queryClient.invalidateQueries("getOpeningHours");
    },
    onError: () => {
      console.log(error);
    },
  });

  const { isPending: updatingLinks, mutate: mutateLinks } = useMutation({
    mutationFn: ({ id, data }) => updateLinks({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries("getSocial");
    },
    onError: () => {
      console.log(error);
    },
  });

  const { isPending: updatingSettings, mutate: mutateSettings } = useMutation({
    mutationFn: ({ id, data }) => updateSettings({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries("getSettings");
    },
    onError: () => {
      console.log(error);
    },
  });

  const { isPending: updatingContacts, mutate: mutateContact } = useMutation({
    mutationFn: ({ id, data }) => updateContacts({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries("getContacts");
    },
    onError: () => {
      console.log(error);
    },
  });

  if (
    isLoading ||
    isSocialLoading ||
    updatingHours ||
    updatingLinks ||
    isSettingsLoading ||
    isContactsLoading ||
    updatingContacts
  )
    return <h1>...Loading</h1>;

  const order = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];

  const sortedData = [...data].sort(
    (a, b) => order.indexOf(a.day) - order.indexOf(b.day)
  );

  return (
    <StyledMain>
      <h1>Nyitvatartás</h1>
      <ul>
        {sortedData.map((data) => {
          return (
            <li key={data.id}>
              <p>
                <strong>{data.day}</strong> : {data.time}
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  mutate({ id: data.id, time: time });
                }}
              >
                Beállítás
              </button>
            </li>
          );
        })}
      </ul>
      <h1>Közösségimédia</h1>
      <ul>
        {socialData?.map((data) => {
          return (
            <li key={data.id}>
              <p>
                <strong>{data.platform}</strong> : {data.link}
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setSocialLink(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  mutateLinks({ id: data.id, data: socialLink });
                }}
              >
                Beállítás
              </button>
            </li>
          );
        })}
      </ul>
      <h1>Beállítások</h1>
      <ul>
        {settingsData?.map((data) => {
          return (
            <li key={data.id}>
              <p>
                <strong>{data.setting} </strong> : {data.value}
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setSetting(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  mutateSettings({ id: data.id, data: setting });
                }}
              >
                Beállítás
              </button>
            </li>
          );
        })}
      </ul>
      <h1>Kapcsolatok</h1>
      <ul>
        {contactsData?.map((data) => {
          return (
            <li key={data.id}>
              <p>
                <strong>{data.contact}</strong> : {data.address}
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  mutateContact({ id: data.id, data: contact });
                }}
              >
                Beállítás
              </button>
            </li>
          );
        })}
      </ul>
    </StyledMain>
  );
}

export default Settings;
