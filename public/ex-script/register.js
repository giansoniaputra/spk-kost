$(document).ready(function () {
    let table = $("#table-register").DataTable({
        responsive: true,
        responsive: !0,
        autoWidth: false,
        serverSide: true,
        ajax: {
            url: "/dataTablesUser"
        },
        columns: [
            {
                data: null,
                orderable: false,
                render: function (data, type, row, meta) {
                    var pageInfo = $("#table-register").DataTable().page.info();
                    var index = meta.row + pageInfo.start + 1;
                    return index;
                },
            },
            {
                data: "username",
            },
            {
                data: "name",
            },
            {
                data: "role",
            },
            {
                data: "action",
                orderable: true,
                searchable: true,
            },
        ],
        columnDefs: [
            {
                targets: [3], // index kolom atau sel yang ingin diatur
                className: "text-center", // kelas CSS untuk memposisikan isi ke tengah
            },
            {
                searchable: false,
                orderable: false,
                targets: 0, // Kolom nomor, dimulai dari 0
            },
        ],
    });
    $("#btn-add-user").on("click", function () {
        $("#modal-title").html('Tambah User')
        $("#btn-action").html(`<button class="btn btn-primary" id="btn-save">Tambah</button>`)
        $("#modal-register").modal("show");
    })

    $("#modal-register").on("click", "#btn-save", function () {
        $.ajax({
            data: $("form[id='form-register']").serialize(),
            url: "/register-create",
            type: "POST",
            dataType: 'json',
            success: function (response) {
                if (response.errors) {
                    displayErrors(response.errors);
                } else {
                    table.ajax.reload()
                    $("#current_id").val('')
                    $("#modal-register").modal("hide");
                    $("#username").val('')
                    $("#password").val('')
                    $("#password_confirmation").val('')
                    $("#modal-title").html('')
                    $("#btn-action").html(``)
                    Swal.fire("Success!", response.success, "success");
                }
            }
        });
    })
    $("#btn-close").on("click", function () {
        $("#modal-register").modal("hide");
        $("#username").val('')
        $("#current_id").val('')
        $("#password").val('')
        $("#password_confirmation").val('')
        $("#modal-title").html('')
        $("#btn-action").html(``)
    })

    $("#table-register").on("click", ".edit-button", function () {
        let uuid = $(this).attr("data-id");
        $.ajax({
            url: "/editUser/" + uuid,
            type: "GET",
            dataType: 'json',
            success: function (response) {
                console.log(response);
                $("#current_id").val(response.data.id)
                $("#modal-register").modal('show');
                $("#username").val(response.data.username)
                $("#name").val(response.data.name)
                $("#modal-title").html('Edit User')
                $("#btn-action").html(`<button class="btn btn-primary" id="updateUser">Update</button>`)
            }
        });
    })

    $("#modal-register").on("click", "#updateUser", function () {
        $.ajax({
            data: $("form[id='form-register']").serialize(),
            url: "/updateUser",
            type: "POST",
            dataType: 'json',
            success: function (response) {
                if (response.errors) {
                    displayErrors(response.errors)
                } else {
                    table.ajax.reload()
                    $("#modal-register").modal("hide");
                    $("#username").val('')
                    $("#password").val('')
                    $("#password_confirmation").val('')
                    $("#modal-title").html('')
                    $("#btn-action").html(``)
                    Swal.fire("Success!", response.success, "success");
                }
            }
        });
    })

    //HAPUS DATA
    $("#table-register").on("click", ".delete-button", function () {
        let id = $(this).attr("data-id");
        let token = $(this).attr("data-token");
        Swal.fire({
            title: "Apakah Kamu Yakin?",
            text: "Kamu akan menghapus data user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    data: {
                        _token: token,
                    },
                    url: "/deleteUser/" + id,
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
                selectElement.on("click", function () {
                    $(this).removeClass("is-invalid");
                });
            });
        });
    }
})
