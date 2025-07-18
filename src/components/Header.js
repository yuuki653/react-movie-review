import React from "react";

const Header = ({ query, setQuery, onSearch }) => {
  return (
    <header style={headerStyle}>
      <h1 style={leftStyle}>映画レビューアプリ</h1>
      <div style={centerStyle}>
        <input
          type="text"
          placeholder="映画を検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />
        <button onClick={onSearch}>検索</button>
      </div>
      <h3 style={rightStyle}>ログイン</h3>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  alignItems: "center",
  backgroundColor: "#fdfdd6ff",
  color: "#363636ff",
};

const leftStyle = {
  flex: "1",
  textAlign: "left",
  margin: "0",
};

const centerStyle = {
  flex: "2",
  textAlign: "center",
};

const rightStyle = {
  flex: "1",
  textAlign: "right",
};

export default Header;
