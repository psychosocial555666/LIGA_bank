import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as ui} from "./ui/ui";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.UI]: ui,
});
