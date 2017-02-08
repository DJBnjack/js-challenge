function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


$(document).ready(function() {
    $(':button').on('click', function() {
        function_string = $("#challenge-1").val();
        console.log(function_string);
        console.log(b64EncodeUnicode(function_string));
        // $.post( "challenge", { input: b64EncodeUnicode(function_string) });
        $.ajax({
            type: "POST",
            url: "challenge",
            data:  {input: b64EncodeUnicode(function_string)},
            dataType: "json",
            success: function(data) {
                console.log(b64DecodeUnicode(data.output));
                $("#challenge-1-result").html(b64DecodeUnicode(data.output));
            }
        });

    });
});