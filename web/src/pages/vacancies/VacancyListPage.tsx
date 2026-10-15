import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { vacanciesApi } from "@/services/vacancies";
import {
  Plus,
  Briefcase,
  MapPin,
  Sparkles,
  Search,
  ExternalLink,
  Edit3,
  Layers,
  Building2,
} from "lucide-react";
import type { Vacancy } from "@/types";
import HeroBanner from "@/components/common/HeroBanner";
import RakaminSpinner from "@/components/common/RakaminSpinner";
import { motion } from "framer-motion";

export default function VacancyListPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    vacanciesApi
      .list()
      .then((res) => setVacancies(res.data.vacancies))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      const matchSearch =
        v.role_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.culture_dimensions?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.skills?.some((s) => s.skill_label.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSearch;
    });
  }, [vacancies, searchQuery]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Hero Banner matching Reference Image 2 */}
      <HeroBanner
        badgeText="⭐️ Rakamin Talent & Career Pipeline"
        title="Explore Job Opportunities"
        highlightText="& Role Profiles"
        subtitle="Kelola lowongan pekerjaan, target skill level, dan benchmark rubrik B7 untuk evaluasi fit/gap kandidat secara objektif."
        bulletPoints={[
          "Penetapan target kompetensi terukur per role (L1 s/d L5)",
          "Perbandingan otomatis dengan hasil wawancara AI kandidat",
          "Dukungan human-in-the-loop review dan governance catatan asesor",
        ]}
        primaryAction={{
          label: "Tambah Lowongan Baru",
          onClick: () => navigate("/vacancies/new"),
          icon: <Plus className="h-4 w-4 mr-1.5" />,
        }}
        secondaryAction={{
          label: "Daftar Assessment",
          onClick: () => navigate("/assessments"),
          icon: <Sparkles className="h-4 w-4 mr-1.5" />,
        }}
        imageSrc="/images/counseling.png"
        imageAlt="Rakamin Career Counseling"
        imageFloatingBadge={{
          title: "Standar Rakamin",
          subtitle: "B7 Competency Matrix",
        }}
      />

      {/* Search & Filter Section (like Reference Image 2) */}
      <div className="space-y-4">
        <div className="text-center max-w-md mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Cari &amp; Kelola Posisi Karir
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Daftar role aktif yang siap diuji dengan asesmen AI otomatis
          </p>
        </div>

        <div className="max-w-2xl mx-auto flex items-center gap-2 p-1.5 rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-[#01959f] focus-within:ring-2 focus-within:ring-[#01959f]/15 transition-all">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Cari berdasarkan judul role, skill, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent outline-hidden text-slate-800 placeholder:text-slate-400"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-slate-400 hover:text-slate-600 px-2"
            >
              Clear
            </button>
          )}
          <Button
            size="sm"
            className="rounded-xl px-4 text-xs font-semibold shadow-xs"
          >
            Cari Role
          </Button>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
          {["all", "Penuh Waktu", "Hybrid", "Engineering", "Product"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === filter
                  ? "bg-[#01959f] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter === "all" ? "Semua Kategori" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Error notification */}
      {error && (
        <div className="border border-destructive/30 rounded-xl p-4 bg-destructive/5 text-sm text-destructive flex items-center gap-2">
          <span>Gagal memuat daftar lowongan pekerjaan. Pastikan server API berjalan normal.</span>
        </div>
      )}

      {/* Loading state with beautiful spinner */}
      {loading ? (
        <RakaminSpinner text="Memuat daftar lowongan karir..." size="lg" />
      ) : filteredVacancies.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-4 bg-white/60">
          <div className="w-14 h-14 rounded-2xl bg-[#01959f]/10 text-[#01959f] flex items-center justify-center mx-auto">
            <Briefcase className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-base">
              {searchQuery ? "Tidak ada role yang cocok" : "Belum ada lowongan tersimpan"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? "Coba ubah kata kunci pencarian Anda."
                : "Buat profil role lowongan pertama Anda untuk mulai memetakan kebutuhan kompetensi."}
            </p>
          </div>
          <Button
            variant="cta"
            onClick={() => navigate("/vacancies/new")}
            className="rounded-xl shadow-sm"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Tambah Lowongan Pertama
          </Button>
        </div>
      ) : (
        /* Rich Card Grid matching Reference Image 1 & 2 */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVacancies.map((v, idx) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#01959f]/50 p-5 shadow-xs hover:shadow-lg hover:shadow-teal-900/5 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Header: Logo & Org */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                      <img
                        src="/images/rakamin-logo.png"
                        alt="Rakamin"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Rakamin Partner
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#01959f] transition-colors line-clamp-1">
                        {v.role_title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Location & Metadata */}
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>Jakarta Selatan • DKI Jakarta</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-800 font-semibold">Competitive Salary &amp; Benefits</span>
                  </div>
                </div>

                {/* Tags (matching Reference Image 1 & 2) */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#01808a] border border-teal-200/60">
                    Penuh Waktu
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#01808a] border border-teal-200/60">
                    Hybrid
                  </span>
                  <span className="text-[11px] text-slate-400 ml-auto font-medium">
                    Aktif
                  </span>
                </div>

                {/* Target Skills Snippet */}
                {v.skills && v.skills.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 mb-1.5">
                      <Layers className="h-3 w-3 text-[#01959f]" />
                      <span>{v.skills.length} Target Rubrics:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {v.skills.slice(0, 3).map((s, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {s.skill_label} (L{s.expected_level})
                        </span>
                      ))}
                      {v.skills.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-semibold px-1 py-0.5">
                          +{v.skills.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/vacancies/${v.id}/edit`)}
                  className="flex-1 rounded-xl text-xs font-semibold h-8 border-slate-200 hover:bg-slate-50"
                >
                  <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit Rubrik
                </Button>
                <Button
                  variant="cta"
                  size="sm"
                  onClick={() => navigate("/assessments/new")}
                  className="flex-1 rounded-xl text-xs font-bold h-8 shadow-xs"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" /> Uji Kandidat
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
