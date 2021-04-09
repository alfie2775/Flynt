import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getSharedCode } from "../others/apiCalls";
import { setLang, setValue, setInput } from "../redux/actions";
import { useDispatch } from "../redux/hooks";
import Main from "./Main";

type Params = {
  codeId: string;
};

const SharedCode = ({ match }: RouteComponentProps<Params>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getSharedCode(match.params.codeId)
      .then((res) => res.data)
      .then((res) => {
        dispatch(setLang(res.lang));
        dispatch(setValue(res.code || "", res.lang));
        dispatch(setInput(res.input || ""));
      });
  }, [match.params.codeId, dispatch]);

  return <Main />;
};

export default SharedCode;
