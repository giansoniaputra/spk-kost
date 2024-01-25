$(document).ready(function () {
    $("#btn-add-perhitungan").on("click", function () {
        Swal.fire({
            title: "Yakin ingin menambah data baru?",
            text: "Anda akan mereset data sebelumnya",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Buat!",
        }).then((result) => {
            if (result.isConfirmed) {
                $("#spinner").html(loader)
                $.ajax({
                    url: "/moora-create",
                    type: "GET",
                    dataType: "json",
                    success: function (response) {
                        $("#spinner").html("")
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response.success,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            document.location.reload();
                        }, 2000)
                    },
                });
            }
        });
    });
    $("#table-perhitungan").on("click", "#nilai-bobot", function () {
        let current_input = document.querySelectorAll(".input-bobot")
        current_input.forEach((a) => {
            a.classList.add('d-none')
            a.parentElement.previousElementSibling.classList.remove('d-none')
        })
        $(this).children().eq(0).addClass("d-none")
        $(this).children().eq(1).children().eq(0).removeClass("d-none")
        $(this).children().eq(1).children().eq(0).focus()
    })
    $("#table-perhitungan").on("change", ".input-bobot", function () {
        let thiss = $(this)
        let p = $(this).parent().prev()
        let uuid = thiss.data("uuid")
        $.ajax({
            data: { bobot: thiss.val() },
            url: "/moora-update/" + uuid,
            type: "get",
            dataType: 'json',
            success: function (response) {
                p.html(response.success)
                thiss.val(response.success)
            }
        });
    })

    // KEPUTUSAN
    $("#btn-normalisasi").on("click", function () {
        $.ajax({
            url: "/moora-normalisasi",
            type: "GET",
            dataType: 'json',
            success: function (response) {
                // console.log(response.hasil)
                let transposedMatrix = transpose(response.hasil);
                // Membuat tabel HTML
                let table = `<div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-header">
                                        <h2>Matrix Normalisasi</h2>
                                        </div>
                                        <div class="card-body">
                                        <table class='table table-bordered table-hover dtr-inline'><tr><th>Alternatif</th>`;

                // Menambahkan kolom untuk masing-masing transposedMatrix
                for (let i = 0; i < transposedMatrix[0].length; i++) {
                    table += "<th>C " + (i + 1) + "</th>";
                }

                table += "</tr>";

                // Mengisi tabel dengan data transposedMatrix
                for (let i = 0; i < transposedMatrix.length; i++) {
                    table += "<tr><td>A" + (i + 1) + "</td>";

                    for (let j = 0; j < transposedMatrix[i].length; j++) {
                        table += "<td>" + transposedMatrix[i][j].toFixed(4) + "</td>";
                    }

                    table += "</tr>";
                }

                table += "</table></div></div></div></div>";

                $("#matrix-normalisasi").html(table)
                $.ajax({
                    data: { data: transposedMatrix },
                    url: "/moora-preferensi",
                    type: "GET",
                    dataType: 'json',
                    success: function (response) {
                        console.log(response);
                        // Membuat tabel HTML
                        let table2 = `<div class="row">
                                        <div class="col-sm-12">
                                            <div class="card">
                                                <div class="card-header">
                                                <h2>Nilai Preferensi</h2>
                                                </div>
                                                <div class="card-body">
                                                    <table class='table table-bordered table-hover dtr-inline'><tr><th>Alternatif</th>`;

                        // Menambahkan kolom untuk masing-masing transposedMatrix
                        for (let i = 0; i < response.result[0].length; i++) {
                            table2 += "<th>C " + (i + 1) + "</th>";
                        }

                        table2 += "</tr>";

                        // Mengisi tabel dengan data response.result
                        for (let i = 0; i < response.result.length; i++) {
                            table2 += "<tr><td>A" + (i + 1) + "</td>";

                            for (let j = 0; j < response.result[i].length; j++) {
                                table2 += "<td>" + response.result[i][j].toFixed(4) + "</td>";
                            }

                            table2 += "</tr>";
                        }

                        table2 += "</table></div></div></div></div>";
                        $("#nilai-preferensi").html(table2)

                        response.hasil.sort((a, b) => b - a);

                        // Membuat elemen tabel
                        const table = document.createElement("table");
                        table.classList.add("table", "table-bordered", "table-hover", "dtr-inline");
                        // Membuat elemen thead
                        const thead = table.createTHead();
                        const headerRow = thead.insertRow();
                        const headers = ["Alternatif", "Hasil", "Ranking"];

                        // Menambahkan kolom ke thead
                        headers.forEach((headerText) => {
                            const th = document.createElement("th");
                            th.textContent = headerText;
                            headerRow.appendChild(th);
                        });

                        // Mendapatkan referensi ke elemen tbody
                        const tbody = table.createTBody();

                        // Membuat baris tabel untuk setiap elemen dalam array
                        response.hasil.forEach((value, index) => {
                            // Membuat elemen baris
                            const row = tbody.insertRow();

                            // Membuat sel untuk nomor urut
                            const cellNo = row.insertCell(0);
                            cellNo.textContent = "A" + (index + 1);

                            // Membuat sel untuk index
                            const cellIndex = row.insertCell(1);
                            cellIndex.textContent = value;

                            // Membuat sel untuk nilai dalam array
                            const cellValue = row.insertCell(2);
                            cellValue.textContent = index + 1;
                        });

                        // Mendapatkan referensi ke elemen div dengan ID "ranking" dalam HTML
                        const rankingDiv = document.getElementById("rangking");

                        // Menambahkan tabel ke dalam div
                        rankingDiv.appendChild(table);
                    }
                });

            }
        });
    })
    // Fungsi untuk mentranspose matriks
    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }
})