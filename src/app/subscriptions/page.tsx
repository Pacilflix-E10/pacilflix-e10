"use client";

import { LanggananModule } from "@/components/modules/LanggananModule";
import withAuth from "@/hoc/withAuth";
import React from "react";

const Langganan = () => <LanggananModule />;

export default withAuth(Langganan);
