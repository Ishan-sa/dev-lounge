import { useState, useEffect } from "react";
import Card1 from "../Card/Card";
import { Grid } from "@nextui-org/react";

export default function Posts() {
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">
            Coding Chronicles: Tales from the Keyboard
          </h1>
          <hr className="w-[100px] border-t-4 border-[#0072f5]" />
        </div>
        <div>
          <p className="text-[#3d3d3d] font-semibold tracking-widest">
            LATEST FROM THE BLOG
          </p>
        </div>
        {/* <Grid.Container gap={2} justify="center">
          <Grid xs={4}>
            <Card1 />
          </Grid>
          <Grid xs={4}>
            <Card1 />
          </Grid>
          <Grid xs={4}>
            <Card1 />
          </Grid>
        </Grid.Container> */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-4">
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
        </div>
      </div>
    </>
  );
}
