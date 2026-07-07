import type React from "react";

interface DataTableSMProp {
  header: string[];
  textAlignmentHeader?: 'text-start'|'text-center'|'text-end';
  data?: (string | React.ReactNode | undefined)[][];
  className?: string;
  loading?: boolean;
}

export function DataTable({ header, textAlignmentHeader='text-start', data = [], className, loading }: DataTableSMProp) {

  return (
    <div className={`${className}`}>
      {/* TABLE */}
      <div className={`w-full h-full overflow-y-auto`}>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {header.map((value, i) => (
                <th key={i} className={`${textAlignmentHeader} sticky top-0 z-10 bg-content font-medium p-2 uppercase text-sm text-neutral-100`}>
                  {value}
                </th>
              ))}
            </tr>
          </thead>

          {
            loading?
            <tbody>
              <tr>
                <td colSpan={header.length} className="p-4 text-center text-neutral-200">Cargando datos...</td>
              </tr>
            </tbody>
            :
            <tbody>
              {data.length === 0 ?
                <tr>
                  <td colSpan={header.length} className="p-4 text-center text-neutral-200">
                    No se encontraron datos
                  </td>
                </tr>
                :
                <>
                  {data.map(
                    (row, r) => (
                      <tr
                        key={r}
                        className={`${(r % 2 === 0) ? 'bg-primary-100/20' : ''} `}
                      >
                        {row.map((col, c) => (
                          <td key={c} className="p-2 text-dark-mint">
                            <div className="flex items-center">
                              {col}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ),
                  )}
                </>
              }
            </tbody>
          }
        </table>
      </div>

      {/* CARDS - Proximamente... */}

    </div>
  );
}


