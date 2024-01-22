$(document).ready(function () {
    let table = $("#table-kriteria").DataTable({
        responsive: true,
        responsive: !0,
        autoWidth: false,
        serverSide: true,
        ajax: {
            url: "/dataTablesKriteria",
        },
        columns: [
            {
                data: "kode",
            },
            {
                data: "kriteria",
            },
            {
                data: "atribut",
            },
            {
                data: "bobot",
            },
            {
                data: "action",
                orderable: true,
                searchable: true,
            },
        ],
        columnDefs: [
            {
                targets: [4], // index kolom atau sel yang ingin diatur
                className: "text-center", // kelas CSS untuk memposisikan isi ke tengah
            },
            {
                searchable: false,
                orderable: false,
                targets: 0, // Kolom nomor, dimulai dari 0
            },
        ],
    });
    // KETIKA BUTTON TAMBAH DATA DI KLIK
    $("#btn-add-data").on("click", function () {
        $("#modal-title").html('Tambah Kriteria')
        $("#btn-action").html(`<button type="button" class="btn btn-primary" id="btn-save">Tambah</button>`)
        $("#modal-kriteria").modal("show");
    })
    // KETIKA MODAL DITUTUP
    $("#btn-close").on("click", function () {
        $("#kode").val("")
        $("#kriteria").val("")
        $("#atribut").val("")
        $("#uuid").val("")
        $("#btn-action").html("")
    })
    // PROSES SIMPAN KRITERIA
    $("#modal-kriteria").on("click", "#btn-save", function () {
        let button = $(this)
        button.attr('disabled', "true");
        $.ajax({
            data: $("form[id='form-kriteria']").serialize(),
            url: "/kriteria",
            type: "POST",
            dataType: 'json',
            success: function (response) {
                if (response.errors) {
                    displayErrors(response.errors);
                    button.removeAttr('disabled');
                } else {
                    table.ajax.reload()
                    button.removeAttr('disabled');
                    $("#kode").val("")
                    $("#kriteria").val("")
                    $("#atribut").val("")
                    $("#uuid").val("")
                    $("#modal-kriteria").modal("hide");
                    $("#btn-action").html("")
                    Swal.fire("Success!", response.success, "success");
                }
            }
        });
    })
    // AMBIL DATA
    $("#table-kriteria").on("click", ".edit-button", function () {
        let uuid = $(this).data("uuid");
        $("#uuid").val(uuid)
        $.ajax({
            data: { uuid: uuid },
            url: "/kriteriaEdit/" + uuid,
            type: "GET",
            dataType: 'json',
            success: function (response) {
                console.log(response.data);
                $("#kode").val(response.data.kode)
                $("#kriteria").val(response.data.kriteria)
                $("#atribut").val(response.data.atribut)
                $("#btn-action").html(`<button type="button" class="btn btn-primary" id="btn-update">Ubah</button>`)
            }
        });
        $("#modal-kriteria").modal("show");
    })

    // UPDATE DATA
    $("#modal-kriteria").on("click", "#btn-update", function () {
        let button = $(this)
        button.attr('disabled', 'true')
        $.ajax({
            data: $("form[id='form-kriteria']").serialize() + '&_method=PUT&uuid=' + $("#uuid").val(),
            url: "/kriteria/" + $("#uuid").val(),
            type: "POST",
            dataType: 'json',
            success: function (response) {
                if (response.errors) {
                    displayErrors(response.errors);
                    button.removeAttr('disabled');
                } else {
                    table.ajax.reload()
                    button.removeAttr('disabled');
                    $("#kode").val("")
                    $("#kriteria").val("")
                    $("#atribut").val("")
                    $("#uuid").val("")
                    $("#modal-kriteria").modal("hide");
                    $("#btn-action").html("")
                    Swal.fire("Success!", response.success, "success");
                }
            }
        });
    })

    // DELETE
    //HAPUS DATA
    $("#table-kriteria").on("click", ".delete-button", function () {
        let uuid = $(this).attr("data-uuid");
        let token = $(this).attr("data-token");
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan menghapus data kriteria!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    data: {
                        _method: "DELETE",
                        _token: token,
                        uuid: uuid
                    },
                    url: "/kriteria/" + uuid,
                    type: "POST",
                    dataType: "json",
                    success: function (response) {
                        table.ajax.reload();
                        Swal.fire("Deleted!", response.success, "success");
                    },
                });
            }
        });
    });
    //Hendler Error
    function displayErrors(errors) {
        // menghapus class 'is-invalid' dan pesan error sebelumnya
        $("input.form-control").removeClass("is-invalid");
        $("select.form-control").removeClass("is-invalid");
        $("div.invalid-feedback").remove();

        // menampilkan pesan error baru
        $.each(errors, function (field, messages) {
            let inputElement = $("input[name=" + field + "]");
            let selectElement = $("select[name=" + field + "]");
            let textAreaElement = $("textarea[name=" + field + "]");
            let feedbackElement = $(
                '<div class="invalid-feedback ml-2"></div>'
            );

            $("#btn-close").on("click", function () {
                inputElement.each(function () {
                    $(this).removeClass("is-invalid");
                });
                textAreaElement.each(function () {
                    $(this).removeClass("is-invalid");
                });
                selectElement.each(function () {
                    $(this).removeClass("is-invalid");
                });
            });

            $.each(messages, function (index, message) {
                feedbackElement.append(
                    $('<p class="p-0 m-0 text-center">' + message + "</p>")
                );
            });

            if (inputElement.length > 0) {
                inputElement.addClass("is-invalid");
                inputElement.after(feedbackElement);
            }

            if (selectElement.length > 0) {
                selectElement.addClass("is-invalid");
                selectElement.after(feedbackElement);
            }
            if (textAreaElement.length > 0) {
                textAreaElement.addClass("is-invalid");
                textAreaElement.after(feedbackElement);
            }
            inputElement.each(function () {
                if (inputElement.attr("type") == "text" || inputElement.attr("type") == "number") {
                    inputElement.on("click", function () {
                        $(this).removeClass("is-invalid");
                    });
                    inputElement.on("change", function () {
                        $(this).removeClass("is-invalid");
                    });
                } else if (inputElement.attr("type") == "date") {
                    inputElement.on("change", function () {
                        $(this).removeClass("is-invalid");
                    });
                } else if (inputElement.attr("type") == "password") {
                    inputElement.on("click", function () {
                        $(this).removeClass("is-invalid");
                    });
                } else if (inputElement.attr("type") == "email") {
                    inputElement.on("click", function () {
                        $(this).removeClass("is-invalid");
                    });
                }
            });
            textAreaElement.each(function () {
                textAreaElement.on("click", function () {
                    $(this).removeClass("is-invalid");
                });
            });
            selectElement.each(function () {
                selectElement.on("change", function () {
                    $(this).removeClass("is-invalid");
                });
            });
        });
    }
})