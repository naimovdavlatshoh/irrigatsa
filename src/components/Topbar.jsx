import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { LiaSitemapSolid } from "react-icons/lia";
import { faA, faImage, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { IoMdArrowDropdown } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Topbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [language, setLanguage] = useState("");
    const [fontSize, setFontSize] = useState("medium");

    const handleFontSizeChange = (size) => {
        setFontSize(size);

        // Apply specific font size mapping based on state
        switch (size) {
            case "small":
                document.documentElement.style.setProperty(
                    "--site-font-size",
                    "14px"
                );
                document.documentElement.style.setProperty(
                    "--site-heading-font-size",
                    "18px"
                );
                break;
            case "medium":
                document.documentElement.style.setProperty(
                    "--site-font-size",
                    "22px"
                );
                document.documentElement.style.setProperty(
                    "--site-heading-font-size",
                    "30px"
                );
                break;
            case "large":
                document.documentElement.style.setProperty(
                    "--site-font-size",
                    "30px"
                );
                document.documentElement.style.setProperty(
                    "--site-heading-font-size",
                    "40px"
                );
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        // Get the language from the query params on initial load
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get("lang");

        if (lang) {
            setLanguage(lang);
            localStorage.setItem("lang", lang); // Save the language in local storage
        } else {
            // If no query parameter, check local storage
            const savedLang = localStorage.getItem("lang");
            if (savedLang) {
                setLanguage(savedLang);
            }
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const changeLanguage = (lang) => {
        localStorage.setItem("lang", lang); // Save to localStorage

        // Create a new URL object based on the current window location
        const url = new URL(window.location);
        url.searchParams.set("lang", lang); // Update or set the lang query parameter

        // Update the URL and refresh the page to apply the new language
        window.history.pushState({}, "", url); // Update the URL in the browser
        window.location.reload(); // Reload the page
    };

    return (
        <div className="bg-gray-100 py-2 w-full z-[99999]">
            <div className="container mx-auto flex justify-between items-center">
                <ul className="flex items-center gap-5 text-sm">
                    <li
                        onClick={() => changeLanguage("uz")}
                        className="cursor-pointer"
                    >
                        O‘ZB
                    </li>
                    <li
                        onClick={() => changeLanguage("ru")}
                        className="cursor-pointer"
                    >
                        РУС
                    </li>
                    <li
                        onClick={() => changeLanguage("en")}
                        className="cursor-pointer"
                    >
                        ENG
                    </li>
                </ul>

                <ul className="flex items-center gap-5 text-sm">
                    <li>
                        <button
                            className="flex items-center gap-1 focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            <IoEyeOutline className="text-xl" />
                            <span>
                                {language === "uz"
                                    ? "Maxsus imkoniyatlar"
                                    : language === "ru"
                                    ? "уникальные возможности"
                                    : language === "en"
                                    ? "unique opportunities"
                                    : "Махсус имкониятлар"}
                            </span>
                            <IoMdArrowDropdown />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-50 mt-2 w-36 rounded-md shadow-lg bg-white">
                                <div className="flex flex-col p-2">
                                    <div className="flex gap-3 justify-center items-center">
                                        <FontAwesomeIcon
                                            onClick={() =>
                                                handleFontSizeChange("small")
                                            }
                                            size="md"
                                            icon={faA}
                                        />
                                        <FontAwesomeIcon
                                            size="lg"
                                            icon={faA}
                                            onClick={() =>
                                                handleFontSizeChange("medium")
                                            }
                                        />
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={faA}
                                            onClick={() =>
                                                handleFontSizeChange("large")
                                            }
                                        />
                                    </div>
                                    <div className="flex gap-3 justify-center mt-2">
                                        <div className="images"></div>
                                        <FontAwesomeIcon
                                            icon={faRefresh}
                                            onClick={() =>
                                                window.location.reload()
                                            }
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>

                    <li className="cursor-pointer flex items-center gap-1">
                        <LiaSitemapSolid />{" "}
                        <span>
                            {language === "uz"
                                ? "Sayt xaritasi"
                                : language === "ru"
                                ? "Карта сайта"
                                : language === "en"
                                ? "Site map"
                                : "Сайт харитаси"}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;
