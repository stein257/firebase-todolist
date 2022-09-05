import * as React from "react"
import "../scss/index.scss"
import SingIn from "../components/SignIn";
import TaskList from "../components/TaskList";
import { initializeApp } from "firebase/app";
import {doc, getFirestore, onSnapshot, setDoc} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {tasksState} from "../recoil/atoms";

const firebaseConfig = {
    // Your firebase config here!
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

function SingOut({auth}) {

    const singOutFromGoogle = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return <button className="sing-out" onClick={singOutFromGoogle}>
        Sing Out
    </button>;
}

const IndexPage = () => {
  const [user] = useAuthState(auth);
  const setTasks = useSetRecoilState(tasksState);
  useEffect(() => {
      try {
          if(user) {
              onSnapshot(doc(db, "users", user.uid), (document) => {
                  console.log("Current data: ", document.data());
                  setTasks(document.data().tasks ?? []);
                  if (!document.data()){
                      try {
                          setDoc(doc(db, "users", user.uid), {
                              tasks: []
                          });
                          console.log("Document written");
                      } catch (e) {
                          console.error("Error adding document: ", e);
                      }
                  }
              });
          }
      } catch (e) {
          console.error("Error getting document: ", e);
      }
  }, [user, setTasks])


  return (
    <main>
        <div className={"app-container " + (user ? "task-list-background" : "sing-in-background")}>
            {user && <SingOut auth={auth}/>}
            <h1 className={(user ? "task-list-color" : "sing-in-color")}>
                <span style={{fontStyle: "italic"}}>To Do List</span>
            </h1>
            <>
                {user ? <TaskList uid={user.uid} firestore={db}/> : <SingIn auth={auth} />}
            </>
        </div>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
