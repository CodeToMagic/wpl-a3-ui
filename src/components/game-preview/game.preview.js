import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../..";

const GamePreview = () => {
  const { id } = useParams();
  const { incrementLoading, decrementLoading } = useContext(GlobalContext);

  useEffect(() => {
    if (id) {
      const getTheGameData = async (id) => {
        incrementLoading();
        const res = await axios.get(`http://localhost:3001/games/${id}`);
        console.log(res);
        decrementLoading();
      };
      getTheGameData(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return <div>Test</div>;
};
export default GamePreview;
