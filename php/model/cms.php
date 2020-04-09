<?php
include_once("db.php");

class CMS
{
    private static $instance = null;
    private function __construct()
    {
    }
    public static function getInstance()
    {
        if (self::$instance instanceof self)
            self::$instance = new self();
        return self::$instance;
    }
    public static function createAdminPanelCategoryPage()
    { {
            $stmt = DB::run("SELECT * FROM product_category ORDER BY id ASC");
            //create table head
            $html = '
            <table class="admin-main__content__category-table">
            <tr>
                <th>CATEGORY\'S NAME</th>
                <th><i class="fas fa-ellipsis-h"></i></th>
            </tr>
            ';
            // append table rows
            while ($category = $stmt->fetch(PDO::FETCH_LAZY)) {
                $html .= "
                    <tr data-post-id='{$category['id']}'>
                        <td>{$category['name']}</td>
                        <td>
                        <form style='display: inline-block;' action='edit.php' method='POST' >
                            <input class='btn btn-default' type='submit' name='edit' value='Edit'>
                            <input type='hidden' name='postId' value='{$category['id']}'>
                        </form>
                        <form style='display: inline-block;' onsubmit='cmsLib.deleteBlogPost(event);'>
                            <input class='btn btn-danger' data-post-id='{$category['id']}' type='submit' name='delete' value='Delete'>
                        </form>
                        </td>
                    </tr>";
            }
            // close table tag
            $html .= "
            </table>
            ";
            echo $html;
        }
    }
}
