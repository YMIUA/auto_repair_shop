import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "./dropdown";
import fetchSearchs from "../api/fetchSearchs";

const initialList = {
  data: [],
  type: "",
};

export default () => {
  let history = useHistory();

  const [isLoading, setIsLoading] = useState(true);

  const [terms, setTerms] = useState(initialList);
  const [brandsTerms, setBrandsTerms] = useState(initialList);
  const [styles, setStyles] = useState(initialList);

  const [selectedTerms, setSelectedTerms] = useState("");
  const [selectedBrandsTerms, setSelectedBrandsTerms] = useState("");
  const [selectedStyles, setSelectedStyles] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetchSearchs();

      const { pathname } = history.location;

      const initialIndexSelectedTerms = pathname.indexOf("/s-");
      const initialIndexSelectedBrandsTerms = pathname.indexOf("/b-");
      const initialIndexSelectedStyles = pathname.indexOf("/st-");

      const responseTerms = response.find((item) => item.type === "terms").data;
      const responseBrandsTerms = response.find(
        (item) => item.type === "brands_terms"
      ).data;
      const responseStyles = response.find((item) => item.type === "styles")
        .data;

      setTerms([
        { slug: "notSelected", key: 0, label: "select terms" },
        ...responseTerms,
      ]);
      setBrandsTerms([
        { slug: "notSelected", key: 0, label: "select brands berms" },
        ...responseBrandsTerms,
      ]);
      setStyles([
        { slug: "notSelected", key: 0, label: "select styles" },
        ...responseStyles,
      ]);

      const initialSelectedTerms = pathname.slice(
        initialIndexSelectedTerms + 3,
        initialIndexSelectedBrandsTerms
      );
      const initialSelectedBrandsTerms = pathname.slice(
        initialIndexSelectedBrandsTerms + 3,
        initialIndexSelectedStyles
      );
      const initialSelectedStyles = pathname.slice(
        initialIndexSelectedStyles + 4
      );

      setSelectedTerms(
        initialIndexSelectedTerms === -1 ? "notSelected" : initialSelectedTerms
      );
      setSelectedBrandsTerms(
        initialIndexSelectedBrandsTerms === -1
          ? "notSelected"
          : initialSelectedBrandsTerms
      );
      setSelectedStyles(
        initialIndexSelectedStyles === -1
          ? "notSelected"
          : initialSelectedStyles
      );
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let newPath = "";
    if (!isLoading) {
      if (selectedTerms !== "notSelected") {
        newPath += `/s-${selectedTerms}`;
      }
      if (selectedBrandsTerms !== "notSelected") {
        newPath += `/b-${selectedBrandsTerms}`;
      }
      if (selectedStyles !== "notSelected") {
        newPath += `/st-${selectedStyles}`;
      }
      history.push(newPath);
    }
  }, [selectedTerms, selectedBrandsTerms, selectedStyles]);

  const onChange = ({ title, value }) => {
    switch (title) {
      case "service":
        setSelectedTerms(value);
        break;
      case "brand":
        setSelectedBrandsTerms(value);
        break;
      case "style":
        setSelectedStyles(value);
        break;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <Dropdown
        data={terms}
        value={selectedTerms}
        onChange={onChange}
        title="service"
      />
      <Dropdown
        data={brandsTerms}
        value={selectedBrandsTerms}
        onChange={onChange}
        title="brand"
      />
      <Dropdown
        data={styles}
        value={selectedStyles}
        onChange={onChange}
        title="style"
      />
    </div>
  );
};
