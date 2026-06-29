import { useState, useMemo } from "react";
import styled from "styled-components";
import { Search, ChevronDown } from "lucide-react";
import AppLayout from "../components/AppLayout";
import { PageBody } from "../styles/DashboardStudent.styles.jsx";

/* ── Mock data ── */
const ALL_ASSIGNMENTS = [
  { id: 1, title: "User Research Report",    module: "User Research",      dueDate: "May 30, 2026", status: "pending",   action: "submit" },
  { id: 2, title: "Competitor Teardown",     module: "Customer Discovery", dueDate: "Jun 5, 2026",  status: "pending",   action: "submit" },
  { id: 3, title: "Foundations Reflection",  module: "Foundations of",     dueDate: "May 10, 2026", status: "graded",    action: "view" },
  { id: 4, title: "Discovery Interview Plan",module: "Customer Discovery", dueDate: "May 22, 2026", status: "submitted", action: "view" },
  { id: 5, title: "JTBD Map",                module: "Customer Discovery", dueDate: "May 5, 2026",  status: "graded",    action: "view" },
  { id: 6, title: "Sprint Retrospective",    module: "Working with",       dueDate: "Jul 1, 2026",  status: "pending",   action: "submit" },
];

const MODULE_OPTIONS = ["All Modules", "User Research", "Customer Discovery", "Foundations of", "Working with"];
const STATUS_OPTIONS = ["All Status", "pending", "graded", "submitted"];
const PAGE_SIZE = 6;

/* ── Styles ── */

const PageHeader = styled.div`
  margin-bottom: 20px;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
`;

const PageSub = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
`;

/* Outer dashed border card */
const TableCard = styled.div`
  background: #fff;
  border: 2px dashed #bfdbfe;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
`;

/* Filter bar */
const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 12px;
  background: #fff;
  flex: 1;
  min-width: 180px;
  color: #9ca3af;
  font-size: 13px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 13px;
  color: #374151;
  flex: 1;
  background: transparent;
  &::placeholder { color: #9ca3af; }
`;

const SelectWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 12px;
  background: #fff;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  white-space: nowrap;
`;

const NativeSelect = styled.select`
  border: none;
  outline: none;
  font-size: 13px;
  color: #374151;
  background: transparent;
  cursor: pointer;
  appearance: none;
  padding-right: 4px;
`;

/* Table */
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  border-bottom: 1px solid #f3f4f6;
`;

const Th = styled.th`
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 10px 12px;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #f9fafb;
  &:last-child { border-bottom: none; }
  &:hover { background: #fafafa; }
`;

const Td = styled.td`
  padding: 14px 12px;
  font-size: 13px;
  color: #374151;
  vertical-align: middle;
`;

const RowNum = styled.span`
  color: #9ca3af;
  font-size: 13px;
`;

const AssignTitle = styled.span`
  font-weight: 600;
  color: #111827;
`;

const ModuleTag = styled.span`
  color: #00b894;
  font-size: 12px;
  font-weight: 500;
`;

const StatusPill = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
  background: ${({ $s }) =>
    $s === "graded"    ? "#dcfce7" :
    $s === "submitted" ? "#dbeafe" :
                         "#fef3c7"};
  color: ${({ $s }) =>
    $s === "graded"    ? "#16a34a" :
    $s === "submitted" ? "#2563eb" :
                         "#d97706"};
`;

const ActionBtn = styled.button`
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  border: ${({ $primary }) => ($primary ? "none" : "1px solid #d1d5db")};
  background: ${({ $primary }) => ($primary ? "#0d2137" : "#fff")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#374151")};
  white-space: nowrap;
  &:hover { opacity: 0.85; }
`;

/* Pagination */
const PaginationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 12px;
  color: #9ca3af;
`;

const PageBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PageBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid ${({ $active }) => ($active ? "#0d2137" : "#e5e7eb")};
  background: ${({ $active }) => ($active ? "#0d2137" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#6b7280")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

/* ── Component ── */
export default function Assignments() {
  const [search, setSearch]         = useState("");
  const [moduleFilter, setModule]   = useState("All Modules");
  const [statusFilter, setStatus]   = useState("All Status");
  const [page, setPage]             = useState(1);

  const filtered = useMemo(() => {
    return ALL_ASSIGNMENTS.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
      const matchModule = moduleFilter === "All Modules" || a.module === moduleFilter;
      const matchStatus = statusFilter === "All Status"  || a.status === statusFilter;
      return matchSearch && matchModule && matchStatus;
    });
  }, [search, moduleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <AppLayout title="Dashboard/Assignments" activeNav="/assignments">
      <PageBody>
        <PageHeader>
          <PageTitle>Assignments</PageTitle>
          <PageSub>Track, submit, and manage all your program assignments.</PageSub>
        </PageHeader>

        <TableCard>
          {/* Filter bar */}
          <FilterBar>
            <SearchWrap>
              <Search size={14} />
              <SearchInput
                placeholder="search assignments"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                aria-label="Search assignments"
              />
            </SearchWrap>

            <SelectWrap>
              <NativeSelect
                value={moduleFilter}
                onChange={handleFilter(setModule)}
                aria-label="Filter by module"
              >
                {MODULE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </NativeSelect>
              <ChevronDown size={13} color="#9ca3af" />
            </SelectWrap>

            <SelectWrap>
              <NativeSelect
                value={statusFilter}
                onChange={handleFilter(setStatus)}
                aria-label="Filter by status"
              >
                {STATUS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </NativeSelect>
              <ChevronDown size={13} color="#9ca3af" />
            </SelectWrap>
          </FilterBar>

          {/* Table */}
          <Table role="table" aria-label="Assignments list">
            <Thead>
              <tr>
                <Th>#</Th>
                <Th>Assignment Title</Th>
                <Th>Module</Th>
                <Th>Due Date</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </Thead>
            <tbody>
              {paginated.length === 0 ? (
                <Tr>
                  <Td colSpan={6} style={{ textAlign: "center", color: "#9ca3af", padding: "32px" }}>
                    No assignments match your filters.
                  </Td>
                </Tr>
              ) : (
                paginated.map((a, i) => (
                  <Tr key={a.id}>
                    <Td><RowNum>{(page - 1) * PAGE_SIZE + i + 1}</RowNum></Td>
                    <Td><AssignTitle>{a.title}</AssignTitle></Td>
                    <Td><ModuleTag>{a.module}</ModuleTag></Td>
                    <Td>{a.dueDate}</Td>
                    <Td><StatusPill $s={a.status}>{a.status}</StatusPill></Td>
                    <Td>
                      <ActionBtn
                        $primary={a.action === "submit"}
                        aria-label={a.action === "submit" ? `Submit ${a.title}` : `View submission for ${a.title}`}
                      >
                        {a.action === "submit" ? "Submit Now" : "View Submission"}
                      </ActionBtn>
                    </Td>
                  </Tr>
                ))
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          <PaginationRow>
            <span>
              Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} assignments
            </span>
            <PageBtns>
              <PageBtn
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                ‹
              </PageBtn>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageBtn
                  key={i + 1}
                  $active={page === i + 1}
                  onClick={() => setPage(i + 1)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={page === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </PageBtn>
              ))}
              <PageBtn
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                ›
              </PageBtn>
            </PageBtns>
          </PaginationRow>
        </TableCard>
      </PageBody>
    </AppLayout>
  );
}
