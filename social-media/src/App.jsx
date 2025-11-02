import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/Createpost";
import PostList from "./components/PostList";
import { useState } from "react";
import PostListProvider from "./store/Post-list-store";


function App() {
  const [SelectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
    <div className="app-container">
      <Sidebar SelectedTab={SelectedTab} setSelectedTab={setSelectedTab} />

      <div className="content">
        <Header />

        {SelectedTab === "Home" ? (
          <PostList />
        ) : (
          <CreatePost />
        )}

        <Footer />
      </div>
    </div>
    </PostListProvider>
  );
}

export default App;
