import React, { useMemo, useState } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CHECK_POSTCODE_API, keywordSuggestions } from "../../data/mockData";

const SearchBox = ({ compact = false, defaultKeyword = "", defaultPostcode = "" }) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(defaultKeyword);
  const [postcode, setPostcode] = useState(defaultPostcode);
  const [focused, setFocused] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const suggestions = useMemo(() => {
    const value = keyword.trim().toLowerCase();

    if (!value) return [];

    return keywordSuggestions
      .filter((item) => item.toLowerCase().includes(value))
      .slice(0, 6);
  }, [keyword]);

  const handleFind = async () => {
    const safeKeyword = keyword.trim();
    const rawPostcode = postcode.trim();

    setError("");

    if (!safeKeyword) {
      setError("Please enter a keyword.");
      return;
    }

    if (!rawPostcode) {
      setError("Please enter a postcode.");
      return;
    }

    try {
      setChecking(true);

      const response = await fetch(CHECK_POSTCODE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postcode: rawPostcode,
        }),
      });

      const data = await response.json();

      if (data?.ok && data?.exists && data?.postcode) {
        navigate(
          `/results?keyword=${encodeURIComponent(
            safeKeyword
          )}&postcode=${encodeURIComponent(data.postcode)}`
        );
        return;
      }

      setError("Postcode not found. Please check and try again.");
    } catch (err) {
      console.log("Postcode check error:", err);
      setError("Could not check postcode right now. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className={compact ? "searchShell compactSearch" : "searchShell"}>
      <div className="searchMain">
        <div className="searchInputBox keywordBox">
          <Search size={21} />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search NWLB"
          />

          {focused && suggestions.length > 0 && (
            <div className="suggestionsBox">
              <div className="suggestionsTitle">Suggestions</div>

              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="suggestionItem"
                  onMouseDown={() => {
                    setKeyword(item);
                    setFocused(false);
                  }}
                >
                  <Search size={13} />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="searchInputBox postcodeBox">
          <MapPin size={21} />
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Postcode"
          />
        </div>

        <button className="findBtn" onClick={handleFind} disabled={checking}>
          {checking ? <Loader2 className="spinIcon" size={20} /> : "Find"}
        </button>
      </div>

      {error ? <div className="searchError">{error}</div> : null}
    </div>
  );
};

export default SearchBox;