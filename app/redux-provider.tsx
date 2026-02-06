"use client";
import { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { Toaster } from "react-hot-toast";
import { rehydrateFromCookie } from "../store/slices/authSlice";


function InnerProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateFromCookie());
  }, [dispatch]);

  return <>{children}</>;
}


export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InnerProvider>{children}</InnerProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </Provider>
  );
}
