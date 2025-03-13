"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/components/api";
import styles from "./updateProfile.module.css";
import style from "@/styles/errorPopUp.module.css";
import { useParams } from "next/navigation";
import userProfile from "@/app/hooks/userProfile";
import useEditProfile from "@/app/hooks/useEditProfile";
import { useRouter } from "next/navigation";
import PopUpError from "@/components/popupError";

export default function setting({}) {
  const router = useRouter();
  const [profileType, setProfileType] = useState("Public");
  const params = useParams();
  const username = params.name;
  const [profiledata, errorPro] = userProfile(username);
  const [error, setupdate] = useState(null);
  const [show, setShow] = useState(true);

  const showPopUp = (check) => {
    setShow(check);
  };
  // useEffect(()=>{
  //   setShow(true);
  // },[show])

  const handleRadioChange = (event) => {
    setProfileType(event.target.value);
  };
  const { avatarUrl, firstName, lastName, aboutMe, nickName, email } =
    profiledata;
  const handleEditProfile = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "username") {
      router.push(`/profile/${value}`, undefined, { shallow: true });
    }
    const formData = new FormData(event.target);
    formData.append("profile_type", profileType);
    const formObject = {};
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }
    const error = await useEditProfile(formObject);
    if (error) {
      showPopUp(true)
      setupdate(error);
      return;
    } else {
      router.push(`/profile/${formObject.nickName}`);
    }
  };
  console.log(show);

  return (
    <div>
      {error && show && (
        <div>
          <div className={style["container-popup"]}>
            <div className={style.popupError}>
              <div className={style["error-icon"]}></div>
              <h2 className={style["error-title"]}>Error</h2>
              <p className={style["error-message"]}>{error}</p>
              <button
                onClick={() => showPopUp(false)}
                className={style["try-again-btn"]}>
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.update}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Account Settings</h2>
          </div>

          <h3>Your Avatar</h3>
          <div className={styles.avatarContainer}>
            <span className={styles["Circle-avart"]}>
              <img
                src={`${API_URL}/${avatarUrl}`}
                className={`${styles["avatarContainer-profile"]} `}
                srcSet=""
                alt="User Avatar"
                layout="fill"
                objectfit="cover"
              />
            </span>
            <p className={styles.avatarText}>
              Avatar help your teammates recognize you in Social Network .
            </p>
          </div>

          <hr className={styles.hr} />
          <form onSubmit={handleEditProfile}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input
                  className={styles.input}
                  type="text"
                  defaultValue={firstName}
                  name="firstName"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input
                  className={styles.input}
                  type="text"
                  defaultValue={lastName}
                  name="lastName"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>User Name</label>
                <input
                  className={styles.input}
                  type="text"
                  defaultValue={nickName}
                  name="nickName"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  type="text"
                  defaultValue={email}
                  name="email"
                />
              </div>
            </div>

            <div className={styles["formRow-radio"]}>
              <label className={styles.label}>Type Profile</label>
              <div className={styles.formradio}>
                <label className={styles.label}>Public</label>
                <input
                  className={styles.radio}
                  type="radio"
                  name="profile_type"
                  value="Public"
                  checked={profileType === "Public"}
                  onChange={handleRadioChange}
                />

                <label className={styles.label}>Private</label>
                <input
                  className={styles.radio}
                  type="radio"
                  name="profile_type"
                  value="Private"
                  checked={profileType === "Private"}
                  onChange={handleRadioChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>About Me</label>
              <textarea
                className={styles.textarea}
                rows="4"
                name="aboutMe"
                defaultValue={aboutMe}
              />
            </div>

            {/* Update profile button */}
            <button className={styles.updateButton}>Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}
