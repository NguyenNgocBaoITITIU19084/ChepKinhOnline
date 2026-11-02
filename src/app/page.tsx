import { Suspense } from "react";
import { CopySettingsCard } from "@/components/copy/CopySettingsCard";
import { SutraList } from "@/components/sutra/SutraList";

export default function Home() {
  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="row row-cards">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Danh sách kinh</h3>
              </div>
              <div className="list-group list-group-flush">
                <Suspense
                  fallback={
                    <div className="list-group-item text-secondary">Đang tải...</div>
                  }
                >
                  <SutraList />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <CopySettingsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
