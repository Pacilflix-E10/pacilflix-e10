import { TayanganModule } from "@/components/modules/TayanganModule";
import { Suspense } from "react";

const TayanganPage = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <TayanganModule />
    </Suspense>
);

export default TayanganPage