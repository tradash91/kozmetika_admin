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
import LoadingPage from "../components/LoadingPage";

function Admin() {
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
    return <LoadingPage/>;
  console.log(contactsData);
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
    <div>
      <div>
        
        <ul>
          {sortedData.map((data) => {
            return (
              <li key={data.id}>
                {data.day}: {data.time}
                <input
                  type="text"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
                <button
                  disabled={time.length > 0 ? false : true}
                  onClick={() => {
                    console.log(data.id);
                    mutate({ id: data.id, time: time });
                  }}
                >
                  Beállítás
                </button>
              </li>
            );
          })}
        </ul>
        <ul>
          {socialData?.map((data) => {
            return (
              <li key={data.id}>
                <p>
                  {data.platform} : {data.link}
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
        <ul>
          {settingsData?.map((data) => {
            return (
              <li key={data.id}>
                <p>
                  {data.setting} : {data.value}
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
        <ul>
          {contactsData?.map((data) => {
            return (
              <li key={data.id}>
                <p>
                  {data.contact}: {data.address}
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
      </div>
      <h1>admin panel</h1>
    </div>
  );
}

export default Admin;
