import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "inventario.db"


def main() -> None:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    before = conn.execute(
        """
        SELECT COUNT(*)
        FROM productos
        WHERE TRIM(UPPER(proveedor)) = 'RT'
        """
    ).fetchone()[0]

    conn.execute(
        """
        UPDATE productos
        SET proveedor = 'CARXON',
            producto = 'RT'
        WHERE TRIM(UPPER(proveedor)) = 'RT'
        """
    )
    conn.commit()

    after = conn.execute(
        """
        SELECT COUNT(*)
        FROM productos
        WHERE TRIM(UPPER(proveedor)) = 'CARXON'
          AND TRIM(UPPER(producto)) = 'RT'
        """
    ).fetchone()[0]

    print(f"registros_modificados={before}")
    print(f"registros_rt_carxon={after}")
    conn.close()


if __name__ == "__main__":
    main()
